"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const CompPost = () => {
  const { data } = useSession();
  console.log(data?.user.id);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-4">
      <h1 className="text-3xl">
        Welcome To, <span className="text-[#001356]">MEET.AI</span>
      </h1>

      <div className="flex flex-col items-center gap-1.5 text-xl">
        Start Your Meetings with you Coustom Agents
        <Link
          href={"/agents"}
          className="rounded-md bg-[#001356] px-3 py-1.5 text-zinc-100"
        >
          Agents
        </Link>
      </div>
    </div>
  );
};

export default CompPost;
