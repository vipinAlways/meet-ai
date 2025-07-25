"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import React from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import {
  ChevronRightIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "~/components/ui/button";
import GeneratedAvatar from "~/components/GeneratedAvatar";

interface Props {
  agentId: string;
}
const AgentId = ({ agentId }: Props) => {
  const [data] = api.agents.getOne.useSuspenseQuery({ id: agentId });
  return (
    <div className="flex flex-1 flex-col gap-x-4 px-4 py-4 md:px-8">
      {/* AgentIdViewHeader */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbLink className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-foreground text-xl font-medium"
              >
                <Link href={"/agents"}>My Agents</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <ChevronRightIcon className="text-foreground size-4 text-xl font-medium" />

            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-foreground text-xl font-medium"
              >
                <Link href={`/agents/${agentId}`}>{data.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbLink>
        </Breadcrumb>
        {/* without modal false the dialog that this dropdown opens cause the website to get stuck  */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button>
              <MoreVerticalIcon /> Edit
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>
              <PencilIcon className="size-4 text-balance" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <TrashIcon className="size-4 text-balance" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounder-lg bg-white border">
        <div className="px-4 flex flex-col col-span-4 gap-y-5">

            <GeneratedAvatar seed={data.name} variant="bottsNeutral" className="size-10"/>
        </div>
      </div>
    </div>
  );
};

export default AgentId;
