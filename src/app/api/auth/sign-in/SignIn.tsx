"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <div>
      <form></form>

      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
      >
        Sign in with Google <FcGoogle />
      </button>
    </div>
  );
};

export default SignIn;
