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
  VideoIcon,
} from "lucide-react";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "~/components/ui/button";
import GeneratedAvatar from "~/components/GeneratedAvatar";
import { Badge } from "~/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  agentId: string;
}
const AgentId = ({ agentId }: Props) => {
  const [data] = api.agents.getOne.useSuspenseQuery({ id: agentId });
  const router = useRouter();
  const utils = api.useUtils()
  const onEidtAgent = () => {
    api.agents.update.useMutation().mutate({ id: agentId });
  };
  const onDeleteAgent = () => {
    api.agents.remove
      .useMutation({
        onSuccess:async () => {
          await utils.agents.getMany.invalidate();
          toast("Agent has been removed", {});
          router.push("/agents");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      })
      .mutate({ id: agentId });
  };
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
            <DropdownMenuItem onClick={() => onEidtAgent}>
              <PencilIcon className="size-4 text-balance" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteAgent}>
              <TrashIcon className="size-4 text-balance" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounder-lg border bg-white">
        <div className="col-span-4 flex flex-col gap-y-5 px-4">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              seed={data.name}
              variant="bottsNeutral"
              className="size-10"
            />
            <h1 className="text-2xl font-medium">{data.name}</h1>
          </div>

          <Badge
            variant={"outline"}
            className="flex items-center [&svg]:size-4"
          >
            {" "}
            <VideoIcon className="text-blue-700" /> 5 Meetings
          </Badge>

          <div className="gapy4 flex flex-col">
            <p className="text-lg font-medium">Instruction</p>
            <p className="text-neutral-800">{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentId;
