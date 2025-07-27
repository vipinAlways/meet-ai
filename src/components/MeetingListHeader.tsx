"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewMeetingDialog from "./NewMeetingDialog";
import SearchFilter from "./AgentsSearchFilter";
import { useMeetingFilters } from "~/hooks/use-meetings-filters";
import StatusFilter from "./StatusFilter";
import { AgentIdFilter } from "~/app/(dashboard)/meetings/AgentIdFilter";
import MeetingsSearchFilter from "~/app/(dashboard)/meetings/MeetingsSearchFilter";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const MeetingListHeader = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useMeetingFilters();

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: 1,
    });
  };

  return (
    <>
      <NewMeetingDialog open={open} onOpenChange={setOpen} />
      <div className="flex flex-col gap-y-4 p-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Meetings</h5>

          <Button
            onClick={() => setOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />

            {isAnyFilterModified && (
              <Button variant={"outline"} onClick={onClearFilters} size={"sm"}>
                <XCircleIcon /> clear
              </Button>
            )}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingListHeader;
