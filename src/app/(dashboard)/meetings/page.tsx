import React, { Suspense } from "react";
import Meeting from "./Meeting";
import { api, HydrateClient } from "~/trpc/server";
import LoadingState from "~/components/LoadingState";
import MeetingListHeader from "~/components/MeetingListHeader";

const page = async () => {
  await api.meetings.getMany.prefetch({});

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

export default page;
