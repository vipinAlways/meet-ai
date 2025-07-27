import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React, { Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import { api, HydrateClient } from "~/trpc/server";
import AgentId from "./AgentId";
import { HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{ agentId: string }>;
}
const page = async ({ params }: Props) => {
  const { agentId } = await params;

  const queryClient = await api.agents.getOne.prefetch({ id: agentId });
  return (
    <HydrateClient>
      <HydrationBoundary state={queryClient}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Agent"
              description="This will take few Seconds"
            />
          }
        >
          <AgentId agentId={agentId} />
        </Suspense>
      </HydrationBoundary>
    </HydrateClient>
  );
};

export default page;
