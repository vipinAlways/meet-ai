"use client"
import { useState } from "react";
import CommandSelect from "~/components/CommandSelect";
import GeneratedAvatar from "~/components/GeneratedAvatar";
import { useMeetingFilters } from "~/hooks/use-meetings-filters";
import { api } from "~/trpc/react";

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingFilters();

  const [agentSearch, setAgentSearch] = useState("");
const query = api.agents.getMany.useQuery({
    pageSize: 100,
    search: agentSearch,
  });
  // console.log(data?.items);
  if (!query.data?.items) {
    return null
  }

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agents"
      option={query.data.items.map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={agent.name}
              variant="bottsNeutral"
              className="size-4"
            />
            {agent.name}
          </div>
        ),
        
      }))}
      onSelect={(value)=>setFilters({agentId:value})}
      onSearch={setAgentSearch}
      value={filters.agentId ?? ""}
    />
  );
};
