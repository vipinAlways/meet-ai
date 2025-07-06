"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {FcGoogle} from 'react-icons/fc'

const SignIn = () => {
  const router = useRouter();
  //TODO: Replace with actual authentication logic
  const isAuthenticated = false; // Replace with actual authentication check logic

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return <div>
    <form></form>


    <button
      onClick={() => {
       signIn("google", { callbackUrl: "/" })
      }}>Sign in with Google <FcGoogle /></button>
  </div>;
};

export default SignIn;
