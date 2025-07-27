import React, { Suspense } from "react";
import Meeting from "./Meeting";
import { api, HydrateClient } from "~/trpc/server";
import LoadingState from "~/components/LoadingState";
import MeetingListHeader from "~/components/MeetingListHeader";
import { loadSearchParams } from "./params";
import type { SearchParams } from "nuqs";
import { HydrationBoundary } from "@tanstack/react-query";


interface Props{
  searchParams:Promise<SearchParams>
}


const page = async ({searchParams}:Props) => {
  const filters = await loadSearchParams(searchParams)
   await api.meetings.getMany.prefetch({
      ...filters
  });

  return (
    <>
      <MeetingListHeader />
      <HydrateClient>
      {/* <HydrationBoundary state={queryClient}> */}
          <Suspense
          fallback={
            <LoadingState
              title="Loading Meeting"
              description="it will take a while Stay attached ......"
            />
          }
        >
          <Meeting />
        </Suspense>
      {/* </HydrationBoundary> */}
      </HydrateClient>
    </>
  );
};

export default page;
