import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MeetingId from "./MeetingId";
import { HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}
const page = async ({ params }: Props) => {
  const { meetingId } = await params;

  const session = await auth();
   await api.meetings.getOne.prefetch({ id: meetingId });
  if (!session) {
    redirect("/api/auth/authentication");
  }
  return (
    <HydrateClient>
     {/* <HydrationBoundary state={queryClient}> */}
       <Suspense
        fallback={
          <LoadingState
            title="Loading Meeting"
            description="This may take few seconds..."
          />
        }
      >
        <MeetingId meetingId={meetingId}/>
      </Suspense>
     {/* </HydrationBoundary> */}
    </HydrateClient>
  );
};

export default page;
