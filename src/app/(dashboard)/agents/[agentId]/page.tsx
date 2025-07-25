import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React, { Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import { api, HydrateClient } from "~/trpc/server";
import AgentId from "./AgentId";

interface Props {
  params: Promise<{ agentId: string }>;
}
const page = async ({ params }: Props) => {
  const { agentId } = await params;

  await api.agents.getOne.prefetch({ id: agentId });
  return (
    <HydrateClient>
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
    </HydrateClient>
  );
};

export default page;
