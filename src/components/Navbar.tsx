"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineEmergencyRecording, MdOutlineSupportAgent } from "react-icons/md";


const Navbar = () => {
  return (
    <div className="h-screen w-72 bg-blue-950 px-4 py-2">
      <aside className="flex gap-4 justify-center flex-col">
        <Link
          href={"/"}
          className="flex w-fit items-center justify-center gap-1.5"
        >
          <Image
            src={"/svgs/logo.svg"}
            alt="logo"
            width={50}
            height={20}
            className="object-cover"
          />
          <span className="text-3xl text-zinc-100">Meet.AI</span>
        </Link>

        <div className="py-3 border-t border-zinc-300 flex flex-col gap-4 border-b">
          <Link href={"/meetings"} className="flex items-center text-xl gap-2 text-zinc-300"><MdOutlineEmergencyRecording className="w-8 h-8"/> Meetings</Link>
          <Link href={"/agents"} className="flex items-center text-xl gap-2 text-zinc-300"><MdOutlineSupportAgent  className="w-8 h-8"/> Agents</Link>
        </div>
        <div>

        </div>
      </aside> 
    </div>
  );
}; 

export default Navbar;
