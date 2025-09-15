"use server";
import type {
  CallEndedEvent,
  CallTranscriptionReadyEvent,
  CallSessionParticipantLeftEvent,
  CallRecordingReadyEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";

import { type NextRequest, NextResponse } from "next/server";
import { inngest } from "~/inngest/client";
import { streamVideo } from "~/lib/stream-videos";
import { db } from "~/server/db";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  // const apiKey = req.headers.get("x-api-key") ?? req.headers.get("X-API-KEY");

  if (!signature) {
    return NextResponse.json(
      {
        error: "missing signature or Api Key",
      },
      { status: 400 },
    );
  }

  console.log("Signature:", signature);
  console.log("API Key:");

  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const evenType = (payload as Record<string, unknown>)?.type;

  if (evenType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId: string = event.call.custom?.meetingId;
    if (!meetingId) {
      return NextResponse.json({ error: "MissingMeetingId" }, { status: 404 });
    }

    const existingMeeting = await db.meetings.findFirst({
      where: {
        id: meetingId,
        status: "UPCOMING",
      },
    });

    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting Not found" }, { status: 404 });
    }

    const updatedMeeting = await db.meetings.update({
      where: {
        id: existingMeeting.id,
      },
      data: {
        startedAt: new Date(),
        status: "ACTIVE",
      },
      include: {
        agent: true,
      },
    });

    if (!updatedMeeting.agent) {
      return NextResponse.json({ error: "Agent not Found" }, { status: 404 });
    }

    const call = streamVideo.video.call("default", meetingId);

    const realTimeClient = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: updatedMeeting.agentId,
    });

    realTimeClient.updateSession({
      instructions: updatedMeeting.agent.instructions,
    });
  } else if (evenType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if (!meetingId) {
      return NextResponse.json({ error: "MissingMeetingId" }, { status: 404 });
    }
    const call = streamVideo.video.call("default", meetingId);

    await call.end();
  } else if (evenType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "MissingMeetingId" }, { status: 404 });
    }

    await db.meetings.update({
      where: {
        id: meetingId,
        status: "ACTIVE",
      },
      data: {
        status: "PROCESSING",
        endedAt: new Date(),
      },
    });
  } else if (evenType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];
    if (!meetingId) {
      return NextResponse.json({ error: "MissingMeetingId" }, { status: 404 });
    }

    const updateMeeting = await db.meetings.update({
      where: {
        id: meetingId,
      },
      data: {
        transcriptUrl: event.call_transcription.url,
      },
    });
    if (!updateMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }
    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updateMeeting.id,
        transcriptUrl: updateMeeting.transcriptUrl,
      },
    });
  } else if (evenType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];
    if (!meetingId) {
      return NextResponse.json({ error: "MissingMeetingId" }, { status: 404 });
    }
    await db.meetings.update({
      where: {
        id: meetingId,
      },
      data: {
        recordingUrl: event.call_recording.url,
      },
    });
  }

  return NextResponse.json({ status: "ok" });
}
