"use client";
import { AlignCenterIcon, Loader2Icon } from "lucide-react";
import React from "react";
import LoadingState from "~/components/LoadingState";
import { api } from "~/trpc/react";

import { useSession } from "next-auth/react";
import { CallConnect } from "./CallConnect";
import generateAvatatUri from "~/lib/avatar";

interface Props {
  meetingId: string;
}

const   CallView = ({ meetingId }: Props) => {
  const session = useSession();
  const [data] = api.meetings.getOne.useSuspenseQuery({
    id: meetingId,
  });

  if (data.status === "COMPLETED") {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingState
          title="Meeting Have Ended"
          description="you can no longer see this meeting"
          Icon={AlignCenterIcon}
        />
      </div>
    );
  }

  if (!session) {
    <div className="from-sidebar-accent flex h-screen items-center justify-center bg-radial">
      <Loader2Icon className="size-6 animate-spin text-white" />
    </div>;
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={data.name}
      userId={session?.data?.user.id ?? ""}
      userName={session?.data?.user.name ?? `@user${Math.random() * 10000}`}
      userImage={
        session.data?.user.image ??
        generateAvatatUri({
          seed: session.data?.user.name ?? `@user${Math.random() * 10000}`,
          variant: "initials",
        })
      }
    />
  );
};

export default CallView;
