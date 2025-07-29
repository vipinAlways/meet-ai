"use client"
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import CallLobby from "./CallLobby";
interface Props {
  meetingName: string;
}

const CallUi = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    await call.join();
    setShow("call");
  };
  const handleLeave = async () => {
    if (!call) return;

    await call.endCall();
    setShow("ended");
  };
  return (
    <StreamTheme className="h-screen w-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && <p>E</p>}
      {show === "ended" && <p>E</p>}
    </StreamTheme>
  );
};

export default CallUi;
