import { api, HydrateClient } from "~/trpc/server";
import Agents from "./Agents";
import { Suspense } from "react";
import LoadingState from "~/components/LoadingState";

const Page = async () => {
  await api.agents.getMany.prefetch();
  return (
    <HydrateClient>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agents"
            description="Please wait while we load your agents...."
          />
        }
      >
        <Agents />
      </Suspense>
    </HydrateClient>
  );
};
export default Page;
