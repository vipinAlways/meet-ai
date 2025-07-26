"use client";
import React from "react";

import { DataTable } from "~/components/DataTable";
import { api } from "~/trpc/react";
import { Meetingcolumns } from "./MeetingColumns";
import EmptyState from "~/components/EmptyState";

const Meeting = () => {
  const [data] = api.meetings.getMany.useSuspenseQuery({});
  if (data.items.length === 0) {
    return (
      <EmptyState
        title="Start your first Meeting"
        description="Create an Meeting . Each Meeting will Prepare you for you future and clear your doudts."
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4">
      <DataTable data={data.items} columns={Meetingcolumns} />
    </div>
  );
};

export default Meeting;
