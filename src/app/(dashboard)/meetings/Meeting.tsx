"use client";
import React from "react";

import { DataTable } from "~/components/DataTable";
import { api } from "~/trpc/react";
import { Meetingcolumns } from "./MeetingColumns";
import EmptyState from "~/components/EmptyState";
import { useRouter } from "next/navigation";
import { useMeetingFilters } from "~/hooks/use-meetings-filters";
import DataPagiNation from "~/components/DataPagiNation";

const Meeting = () => {
  const router = useRouter()
  const [filters,setFilters] = useMeetingFilters()
  const [data] = api.meetings.getMany.useSuspenseQuery({
    ...filters
  });
  if (data.items.length === 0) {
    return (
      <EmptyState
        title="Start your first Meeting"
        description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4">
      <DataTable data={data.items} columns={Meetingcolumns} onRowClick={(row)=>router.push(`/meetings/${row.id}`)} />
      <DataPagiNation onPageChange={(page)=>setFilters({page})} page={filters.page} totalPage={data.totalPages}/>
    </div>
  );
};

export default Meeting;
