"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewAgentDialog from "./newAgentDialog";
import { useAgentFilters } from "~/hooks/use-agents-filters";
import SearchFilter from "./AgentsSearchFilter";
import { ScrollBar } from "./ui/scroll-area";
import { ScrollArea } from "@radix-ui/react-scroll-area";


const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentFilters();
  const [isOpen, setISOpen] = useState(false);
  
  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: 1,
    });
  };
  return (
    <>
      <NewAgentDialog open={isOpen} onOpenChange={setISOpen} />
      <div className="flex flex-col gap-y-4 p-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>

          <Button
            onClick={() => setISOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            New Agent
          </Button>
        </div>

      <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
          <SearchFilter/>
          {isAnyFilterModified && (
            <Button
              variant={"outline"}
              onClick={onClearFilters}
              size={"sm"}
            >
              <XCircleIcon /> clear
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
      </div>
    </>
  );
};

export default AgentsListHeader;
