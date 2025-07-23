"use client";
import {  signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";

const CompPost = () => {
  const {data} = useSession();
  console.log(data);
  return (
    <div>
      {data ? (
        <Button onClick={() => signOut({ callbackUrl: "/" })}>
          <IoIosLogOut /> Sign out
        </Button>
      ) : (
        <Link href={"/api/auth/authentication"} >
          Join Us
        </Link>
      )}
    </div>
  );
};

export default CompPost;
