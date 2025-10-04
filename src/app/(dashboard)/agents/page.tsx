import { api, HydrateClient } from "~/trpc/server";

import { lazy, Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import AgentsListHeader from "~/components/AgentsListHeader";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "./params";
import { HydrationBoundary } from "@tanstack/react-query";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
interface Props {
  searchParams: Promise<SearchParams>;
}

const LazyAgents = lazy(() => import("./Agents"));
const Page = async ({ searchParams }: Props) => {
  const session = await auth()
  const filters = await loadSearchParams(searchParams);
  const queryClient = await api.agents.getMany.prefetch({ ...filters });

  if(!session?.user){
    redirect("/api/auth/authentication")
    
  }
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
            <LazyAgents />
          </Suspense>
        </HydrationBoundary>
      </HydrateClient>
    </>
  );
};
export default Page;
