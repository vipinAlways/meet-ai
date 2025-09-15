"use client";
import {
  type Call,
  CallingState,
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
      void (async () => {
        try {
          await client_.disconnectUser();
        } catch (err) {
          console.error("Failed to disconnect user:", err);
        } finally {
          setClient(undefined);
        }
      })();
    };
  }, [userId, generateToken, userName, userImage]);

  useEffect(() => {
    if (!client) return;

    let isMounted = true;
    const call_ = client.call("default", meetingId);

    const setupCall = async () => {
      try {
        await call_.join({ create: true });
        await call_.camera.disable();
        await call_.microphone.disable();

        if (isMounted) {
          setCall(call_);
        }
      } catch (err) {
        console.error("Failed to join call:", err);
        try {
          await call_.endCall();
        } catch (endErr) {
          console.error("Error ending call after failure:", endErr);
        }
      }
    };

    setupCall();

    return () => {
      isMounted = false;

      (async () => {
        try {
          if (call_.state.callingState !== CallingState.LEFT) {
            await call_.leave();
            await call_.endCall();
          }
        } catch (err) {
          console.error("Error cleaning up call:", err);
        } finally {
          setCall(undefined);
        }
      })();
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
