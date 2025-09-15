import JSONL from "jsonl-parse-stringify";
import { inngest } from "./client";
import { db } from "~/server/db";
import type { StreamTranscriptItem } from "~/lib/type";
import { summarizer } from "~/lib/agent";
import type { TextMessage } from "@inngest/agent-kit";

export const meetingProcess = inngest.createFunction(
  { id: "meetings/processing" },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptUrl as URL).then((res) => res.text());
    });

    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTranscriptItem>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id).filter(Boolean)),
      ];

      if (speakerIds.length === 0) {
        return transcript.map((item) => ({
          ...item,
          user: { name: "Unknown" },
        }));
      }

      const [userSpeakers, agentSpeakers] = await Promise.all([
        db.user.findMany({ where: { id: { in: speakerIds } } }),
        db.agents.findMany({ where: { id: { in: speakerIds } } }),
      ]);

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find((s) => s.id === item.speaker_id);
        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown",
            },
          };
        }
        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });

    const { output } = await summarizer.run(
      "Summarize the following transcript: " +
        JSON.stringify(transcriptWithSpeakers),
    );

    await step.run("save-summary", async () => {
      await db.meetings.update({
        where: { id: event.data.meetingId },
        data: {
          status: "COMPLETED",
          summary: (output[0] as TextMessage).content as string,
        },
      });
    });
  },
);
