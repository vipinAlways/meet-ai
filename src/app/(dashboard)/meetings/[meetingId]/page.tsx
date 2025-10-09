import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MeetingId from "./MeetingId";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}
const Page = async ({ params }: Props) => {
  const { meetingId } = await params;

  const session = await auth();
await api.meetings.getOne.prefetch({ id: meetingId });
  if (!session) {
    redirect("/api/auth/authentication");
  }
  return (
    <HydrateClient>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Meeting"
            description="This may take few seconds..."
          />
        }
      >
        <MeetingId meetingId={meetingId} />
      </Suspense>
    </HydrateClient>
  );
};

export default Page;
