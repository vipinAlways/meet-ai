"use client";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  onLeave: () => void;
  meetingName: string;
}
const CallActive = ({ meetingName, onLeave }: Props) => {
  return (
    <div className="flex h-screen flex-col justify-between p-4 text-white">
      <div className="flex items-center gap-4 rounded-full bg-[#101213] p-4">
        <Link
          href={"/"}
          className="flex w-fit items-center justify-center rounded-full bg-zinc-300 p-1"
        >
          <Image src={"/svgs/logo.svg"} height={22} width={22} alt="logo" />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />

      <div className="rounded-full bg-black px-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};  

export default CallActive;
