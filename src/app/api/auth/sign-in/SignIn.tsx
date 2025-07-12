"use client";

import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { dot } from "node:test/reporters";
import { api } from "~/trpc/react";

interface SignInProps {
  email: string;
  disable:boolean
}
//TODO:complete the auth one

const SignIn = () => {
  //TODO:make sure email works fine
  const [authProp, setAuthProp] = useState<SignInProps>({
    email: "",
    disable:false
  });


  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      signIn("nodemailer", {
        email: authProp.email,
        callbackUrl: "/profile",
      });
      setAuthProp((prev)=>({...prev,boolean:true}))
    },
    [authProp],
  );


  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 rounded-lg p-8 text-lg shadow-md transition-colors sm:text-xl"
      >

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md border p-2 focus:border-blue-500 focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            value={authProp.email}
            onChange={(e) =>
              setAuthProp((prev) => ({ ...prev, email: e.target.value }))
            }
            disabled={authProp.disable}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-zinc-100"
        >
          Sign In
        </button>
      </form>
            <div className="text-center">Or</div>
      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
        className="mt-4 flex items-center justify-center rounded-md bg-blue-600 p-2 text-lg text-white shadow-md transition-colors hover:bg-blue-500 sm:text-xl"
      >
        Sign in with Google <FcGoogle />
      </button>
    </div>
  );
};

export default SignIn;
