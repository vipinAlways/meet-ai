import {
  Call,
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
import "@stream-io/video-react-sdk/dist/css/style.css";
import { api } from "~/trpc/react";

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
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY ?? "",
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


    const call_ = client.call
  }, [client]);
  return <div></div>;
};
