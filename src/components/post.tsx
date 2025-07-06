"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";

const CompPost = () => {
  return (
    <div>
      <button onClick={() => signIn("google", { callbackUrl: "/" ,})}>
        Sign In
      </button>
      <button onClick={() => signOut({callbackUrl: "/"})}>
        Sign out
      </button>
    
    </div>
  );
};

export default CompPost;
