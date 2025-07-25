import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useAgentFilters } from "~/hooks/use-agents-filters";

const AgentsSearchFilter = () => {
    const [filters,setFilters]  = useAgentFilters()
  return (
    <div className="relative">
        <input type="text" className="h-9 w-[200px] pl-7 bg-white rounded-md focus:outline-zinc-600"  value={filters.search} onChange={(e=>setFilters({search:e.target.value}))} />
        <CiSearch className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"/>

    </div>
  )
}

export default AgentsSearchFilter