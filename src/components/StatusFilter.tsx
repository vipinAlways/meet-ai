import React from "react";
import { MeetingStatus } from "~/lib/type";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import { useMeetingFilters } from "~/hooks/use-meetings-filters";
import CommandSelect from "./CommandSelect";
const option = [
  {
    id: MeetingStatus.UPCOMING,
    value: MeetingStatus.UPCOMING,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.UPCOMING}
      </div>
    ),
  },
  {
    id: MeetingStatus.COMPLETED,
    value: MeetingStatus.COMPLETED,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.COMPLETED}
      </div>
    ),
  },
  {
    id: MeetingStatus.ACTIVE,
    value: MeetingStatus.ACTIVE,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.ACTIVE}
      </div>
    ),
  },
  {
    id: MeetingStatus.PROCESSING,
    value: MeetingStatus.PROCESSING,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.PROCESSING}
      </div>
    ),
  },
  {
    id: MeetingStatus.CANCELLED,
    value: MeetingStatus.CANCELLED,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.CANCELLED}
      </div>
    ),
  },
];

const StatusFilter = () => {
  const [filter, setFilters] = useMeetingFilters();
  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      option={option}
      onSelect={(value) =>
        setFilters({ status: value ? (value as MeetingStatus) : undefined })
      }
      value={filter.status ?? ""}
    ></CommandSelect>
  );
};

export default StatusFilter;
