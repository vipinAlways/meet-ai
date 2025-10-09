import React, { Suspense } from "react";
import Meeting from "./Meeting";
import { api, HydrateClient } from "~/trpc/server";
import LoadingState from "~/components/LoadingState";
import MeetingListHeader from "~/components/MeetingListHeader";
import { loadSearchParams } from "./params";
import type { SearchParams } from "nuqs";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const session = await auth();
  const filters = await loadSearchParams(searchParams);

  if (!session?.user) {
    redirect("/api/auth/authentication");
  }

  if (filters.agentId || filters.search || filters.page || filters.status) {
    await api.meetings.getMany.prefetch({
      ...filters,
    });
  }

  return (
    <>
      <MeetingListHeader />
      <HydrateClient>
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
      </HydrateClient>
    </>
  );
};

export default Page;
