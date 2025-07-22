"use client";

import React from "react";
import LoadingState from "~/components/LoadingState";
import { api } from "~/trpc/react";

const Agents = () => {
  const [data] = api.agents.getMany.useSuspenseQuery();

  if (!data || data?.length === 0)
    return (
      <LoadingState
        title="No Agents Found"
        description="Please add an agent to get started."
      />
    );

  return (
    <div>
      {data.map((agent) => (
        <div key={agent.id}>{agent.name}</div>
      ))}
    </div>
  );
};

export default Agents;
