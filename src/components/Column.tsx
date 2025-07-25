"use client";

import { type ColumnDef } from "@tanstack/react-table";
import type { AgentGetOne } from "~/lib/type";
import GeneratedAvatar from "./GeneratedAvatar";
import {  CornerRightDownIcon, VideoIcon } from "lucide-react";
import { Badge } from "./ui/badge";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-y-1">
          {" "}
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              variant="bottsNeutral"
              seed={row.original.name}
              className="size-6"
            />
            <span className="font-semibold capitalize">
              {row.original.name}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <CornerRightDownIcon className="text-muted-foreground size-3" />
            <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
              {row.original.instructions}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey:"meetingCount",
    header:"Meetings",
    cell:({row})=>{
      return (
        <Badge variant={"outline"} className="flex items-center gap-x-2 [&svg]:size-4">
          <VideoIcon className="text-blue-700" />

          {/* {row.original.meetingCount} {row.original.meetingCount === 1 ? "Meeting" : "Meetings"} */}
          {"5"} {"Meetings"}
        </Badge>
      )
    }
  }
];
