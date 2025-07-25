"use client";

import { Ban } from "lucide-react";
import React, { useState } from "react";
import { TiEject } from "react-icons/ti";
import { columns } from "~/components/Column";
import { DataTable } from "~/components/DataTable";
import EmptyState from "~/components/EmptyState";
import LoadingState from "~/components/LoadingState";
import ResponsiveDialog from "~/components/ResponsiveDialog";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const Agents = () => {
  const [open, setOpen] = useState(true);
  const [data] = api.agents.getMany.useSuspenseQuery();

  if (!data || data?.length === 0)
    return (
      <EmptyState
        title="Create your first Agent"
        description="Create an agent to join your meetings. Each agent will follow your
instructions and can interact with participants during the call."
      />
    );

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Agents;
