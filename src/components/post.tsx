"use client";

import React, { lazy } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";

import Feature from "./Feature";

import Footer from "./Footer";

const LazyTestimonials = lazy(() => import("./Testimonials"));
const LazyHowWork = lazy(() => import("./HowWork"));

const CompPost = () => {
  return (
    <div className="relative w-full space-y-10 p-4">
      <div className="mt-28 flex h-1/5 flex-col items-center gap-5">
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

      <LazyHowWork />
      <LazyTestimonials />
      <Footer />
    </div>
  );
};

export default CompPost;
