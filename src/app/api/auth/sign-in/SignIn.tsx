"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {

  //TODO:make sure email works fine 
  const [email, setEmail] = useState<string>("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (email !== "") {
        signIn("nodemailer", { email, callbackUrl: "/" });
      }
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="text" id="name" placeholder="Enter Your Name" />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>

      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }
      }
      className="flex items-center justify-center mt-4 p-2 bg-white text-black rounded-md shadow-md hover:bg-gray-100 transition-colors"
      >
        Sign in with Google <FcGoogle />
      </button>
    </div>
  );
};

export default SignIn;
