"use client";
import Link from "next/link";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const Page = () => {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex h-fit max-w-xl flex-col items-center justify-center gap-4 rounded-lg bg-zinc-300 p-5 text-xl text-nowrap shadow-md transition-colors">
        <div className="group relative flex items-center justify-center">
          <svg width="120" height="120" className="circle">
            <circle cx="60" cy="60" r="50" stroke="#82181a" />
          </svg>
          <RxCross2 className="tick absolute h-20 w-20 text-red-900 opacity-100 transition-all duration-1000 ease-out" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl">Server Issue </h1>
          <p className="flex flex-col items-center justify-center gap-4 text-lg">
            {" "}
           Something went wrong on our end. Please try again later.
          </p>
          <Link
            href={"/api/auth/sing-in"}
            className="flex w-fit items-center gap-4 rounded-md bg-blue-500 px-4 py-2 text-zinc-200 outline-0 transition-all duration-150 ease-out hover:bg-blue-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
