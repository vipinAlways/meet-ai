import { api, HydrateClient } from "~/trpc/server";
import Agents from "./Agents";
import { Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import AgentsListHeader from "~/components/AgentsListHeader";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "./params";
import { HydrationBoundary } from "@tanstack/react-query";
interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
  const queryClient = await api.agents.getMany.prefetch({ ...filters });
  return (
    <>
      <AgentsListHeader />

      <HydrateClient>
        <HydrationBoundary state={queryClient}>

        <Suspense
          fallback={
            <LoadingState
              title="Loading Agents"
              description="Please wait while we load your agents...."
              spin="spin"
            />
          }
        >
          <Agents />
        </Suspense>
        </HydrationBoundary>
      </HydrateClient>
    </>
  );
};
export default Page;
