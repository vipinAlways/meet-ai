"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import NewMeetingDialog from "./NewMeetingDialog";

const MeetingListHeader = () => {
  const [open,setOpen]=useState(false)
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

       
      </div>
    </>
  );
};

export default MeetingListHeader;
