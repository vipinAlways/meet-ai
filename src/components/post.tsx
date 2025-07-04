"use client";
import { signIn } from "next-auth/react";
import React from "react";

const CompPost = () => {
  return (
    <div>
      <button onClick={() => signIn("google", { callbackUrl: "/" ,})}>
        Sign In
      </button>
    
    </div>
  );
};

export default CompPost;
