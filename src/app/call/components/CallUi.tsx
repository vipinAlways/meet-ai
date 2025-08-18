"use client";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import CallLobby from "./CallLobby";
import CallActive from "./CallActive";
import CallEnd from "./CallEnd";
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
    try {
      await call.join();
      setShow("call");
      await call.leave();
      setShow("ended");
    } catch (error) {
      console.error("Failed to join call", error);
    }
  };
  return (
    <StreamTheme className="h-screen w-full">
      {show === "lobby" ? (
        <CallLobby onJoin={handleJoin} />
      ) : show === "call" ? (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      ) : (
        <CallEnd />
      )}
    </StreamTheme>
  );
};

export default CallUi;
