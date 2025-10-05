"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";
import Testimonials from "./Testimonials";
import Feature from "./Feature";
import HowWork from "./HowWork";

const CompPost = () => {
    return (
    <div className="space-y-16 p-4">
      <div className="mt-28 flex h-1/4 flex-col items-center gap-5">
        <h1 className="w-full text-center text-5xl tracking-tight">
          <strong className="">
            Master Your nervousness <br /> with Real-Time Practice
          </strong>
        </h1>
        <Link
          href={"/agents"}
          className="flex gap-3 rounded-md bg-[#001356] px-4 py-3 text-zinc-100"
        >
          Get Started <Rocket />
        </Link>
        <p className="flex flex-col items-center gap-1.5 text-center text-xl">
          Improve your communication, timing, and <br /> confidence with
          AI-powered meeting simulations.   
        </p>
      </div>
      <Feature />

      <HowWork/>
      <Testimonials />
    </div>
  );
};

export default CompPost;
