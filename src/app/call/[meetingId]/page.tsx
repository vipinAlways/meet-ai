import { HydrationBoundary,dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import CallView from "../components/CallView";

interface Props {
  params: Promise<{ meetingId: string }>;
}
const page = async ({ params }: Props) => {
  const { meetingId } = await params;

  const session = await auth();
 await api.meetings.getOne.prefetch({id:meetingId})
  if (!session) {
    redirect("/api/auth/authentication");
  }

  return (
    <HydrateClient>
      
        <Suspense
          fallback={
            <LoadingState
              title="Meeting is starting"
              description="it may take time"
            />
          }
        >
          <CallView meetingId={meetingId}/>
        </Suspense>

    </HydrateClient>
  );
};

export default page;
