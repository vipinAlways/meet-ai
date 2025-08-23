"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

const CompPost = () => {
  const {data} = useSession();
  console.log(data?.user.id);
  return (
    <div className=" p-4 flex  h-full flex-col items-center justify-center gap-5">
      <h1 className="text-3xl ">Welcome To, <span className="text-[#001356]">MEET.AI</span></h1>

      <div className="text-xl flex flex-col items-center gap-1.5">
        Start Your Meetings with you Coustom Agents
        <Link href={"/agents"} className="bg-[#001356] text-zinc-100 px-3 py-1.5 rounded-md">Agents</Link>
      </div>
    </div>
  );
};

export default CompPost;
