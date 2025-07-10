"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

interface SignInProps {
  email: string;
  password: string;
  name: string;
}

const SignIn = () => {
  //TODO:make sure email works fine
  const [authProp, setAuthProp] = useState<SignInProps>({
    email: "",
    password: "",
    name: "",
  });
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   

    // Call API to save pending user
    const res = await fetch("/api/auth/pending-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authProp),
    });

    if (!res.ok) {
      // setStatus("Account already exists or something went wrong.");
      return;
    }

    // Send magic link
    await signIn("email", {
      email: authProp.email,
      callbackUrl: "/",
    });

    // setStatus("✅ Check your email for the magic login link.");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 rounded-lg p-8 text-lg shadow-md transition-colors sm:text-xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            User Name
          </label>
          <input
            className="rounded-md border p-2 focus:border-green-500 focus:outline-none"
            type="text"
            id="name"
            placeholder="Enter Your Name"
            value={authProp.name}
            onChange={(e) =>
              setAuthProp((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-md border p-2 focus:border-green-500 focus:outline-none"
            type="password"
            id="password"
            placeholder="Password"
            value={authProp.password}
            onChange={(e) =>
              setAuthProp((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md border p-2 focus:border-green-500 focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            value={authProp.email}
            onChange={(e) =>
              setAuthProp((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-green-600 px-4 py-2 text-zinc-100"
        >
          Sign In
        </button>
      </form>

      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
        className="mt-4 flex items-center justify-center rounded-md bg-green-600 p-2 text-lg text-white shadow-md transition-colors hover:bg-green-500 sm:text-xl"
      >
        Sign in with Google <FcGoogle />
      </button>
    </div>
  );
};

export default SignIn;
