import { api, HydrateClient } from "~/trpc/server";
import Agents from "./Agents";
import { Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import AgentsListHeader from "~/components/AgentsListHeader";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "./params";
interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
  await api.agents.getMany.prefetch({ ...filters });
  return (
    <>
      <AgentsListHeader />
      <HydrateClient>
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
      </HydrateClient>
    </>
  );
};
export default Page;
