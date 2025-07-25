"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "~/components/Column";
import DataPagiNation from "~/components/DataPagiNation";
import { DataTable } from "~/components/DataTable";
import EmptyState from "~/components/EmptyState";
import { useAgentFilters } from "~/hooks/use-agents-filters";
import { api } from "~/trpc/react";

const Agents = () => {
  const [filters, setFilters] = useAgentFilters();
  const [data] = api.agents.getMany.useSuspenseQuery({ ...filters });
  const router = useRouter();
  if (!data || data.items.length === 0)
    return (
      <EmptyState
        title="Create your first Agent"
        description="Create an agent to join your meetings. Each agent will follow your
instructions and can interact with participants during the call."
      />
    );

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagiNation
        page={filters.page}
        totalPage={data.totalPages}
        onPageChange={(page: number) => setFilters({ page })}
      />
    </div>
  );
};

export default Agents;
