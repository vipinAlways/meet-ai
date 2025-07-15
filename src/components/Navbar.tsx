"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MdOutlineEmergencyRecording,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { Button } from "./ui/button";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {

  const {data} = useSession();
  return (
    <div className="hidden h-screen w-72 bg-blue-800 px-4 py-2 md:flex flex-col justify-between">
      <aside className="flex flex-col justify-center gap-4">
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

        <div className="flex flex-col gap-4 border-t border-b border-zinc-300 py-3">
          <Link
            href={"/meetings"}
            className="flex items-center gap-2 text-xl text-zinc-300"
          >
            <MdOutlineEmergencyRecording className="h-8 w-8" /> Meetings
          </Link>
          <Link
            href={"/agents"}
            className="flex items-center gap-2 text-xl text-zinc-300"
          >
            <MdOutlineSupportAgent className="h-8 w-8" /> Agents
          </Link>
        </div>
        <div></div>
      </aside>
      <div className="w-fullss">
        {data ? (
          <Button onClick={() => signOut({ callbackUrl: "/" })}>
            <IoIosLogOut /> Sign out
          </Button>
        ) : (
          <Link href={"/api/auth/authentication"}>Join Us</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
