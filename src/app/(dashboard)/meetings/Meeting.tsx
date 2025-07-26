"use client";
import React from "react";
import { api } from "~/trpc/react";

const Meeting = () => {
  const [data] = api.meetings.getMany.useSuspenseQuery({});
  return <div>
      
  </div>;
};

export default Meeting;
