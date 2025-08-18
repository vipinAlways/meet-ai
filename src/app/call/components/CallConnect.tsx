"use client";
import {
  Call,
  CallingState,
  CallState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { api } from "~/trpc/react";
import { Loader2Icon } from "lucide-react";
import CallUi from "./CallUi";

export const CallConnect = ({
  meetingId,
  meetingName,
  userName,
  userId,
  userImage,
}: Props) => {
  const [client, setClient] = useState<StreamVideoClient>();

  const [call, setCall] = useState<Call>();
  const { mutateAsync: generateToken } =
    api.meetings.generateToken.useMutation();
  useEffect(() => {
    const client_ = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });

    setClient(client_);

    return () => {
      client_.disconnectUser();
      setClient(undefined);
    };
  }, [userId, generateToken, userName, userImage]);

  useEffect(() => {
    if (!client) {
      return;
    }

    const call_ = client.call("default", meetingId);
    call_
      .join({ create: true }) // `create: true` ensures the call is created if missing
      .then(() => {
        call_.camera.disable();
        call_.microphone.disable();
        setCall(call_);
      })
      .catch((err) => {
        console.error("Failed to join call:", err);
      });

    call_.camera.disable();
    call_.microphone.disable();

    setCall(call_);

    return () => {
      if (call_.state.callingState !== CallingState.LEFT) {
        call_.leave();
        call_.endCall();
        setCall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="from-sidebar-accent flex h-screen items-center justify-center bg-radial">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    );
  }
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUi meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
