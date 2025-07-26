import React from "react";
import { CiSearch } from "react-icons/ci";
import { useAgentFilters } from "~/hooks/use-agents-filters";
import { useMeetingFilters } from "~/hooks/use-meetings-filters";

const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingFilters();
  return (
    <div className="relative">
      <input
        type="text"
        className="h-9 w-[200px] rounded-md bg-white pl-7 focus:outline-zinc-600"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <CiSearch className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
    </div>
  );
};

export default MeetingsSearchFilter;
