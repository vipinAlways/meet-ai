"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";
import React, { useState } from "react";
import { api } from "~/trpc/react";

import {
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  VideoIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Button } from "~/components/ui/button";
import GeneratedAvatar from "~/components/GeneratedAvatar";
import { Badge } from "~/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UpdateAgentDialog from "~/components/updateAgentDilog";
import { CiMenuKebab } from "react-icons/ci";

interface Props {
  agentId: string;
}
const AgentId = ({ agentId }: Props) => {
  const [data] = api.agents.getOne.useSuspenseQuery({ id: agentId });
  const router = useRouter();
  const utils = api.useUtils();
  const route = useRouter();
  const [updateAgentDilogOpen, setUpdateAgentDilogOpen] = useState(false);
  const removeAgent = api.agents.remove.useMutation({
    onSuccess: async () => {
      await utils.agents.getMany.invalidate();
      toast("Agent has been removed", {});
      router.push("/agents");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onDeleteAgent = () => {
    removeAgent.mutate({ id: agentId });
  };
  return (
    <>
      <UpdateAgentDialog
        onOpenChange={setUpdateAgentDilogOpen}
        open={updateAgentDilogOpen}
        initialValues={data}
      />
      <div className="flex flex-1 flex-col gap-4 px-4 py-4 md:px-8">
        {/* AgentIdViewHeader */}
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbLink className="flex items-center">
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-foreground text-xl font-medium"
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => router.push("/agents")}
                  >
                    My Agents
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <ChevronRightIcon className="text-foreground size-4 text-xl font-medium" />

              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-foreground text-xl font-medium"
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => router.push(`/agents/${agentId}`)}
                  >
                    {data.name}
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbLink>
          </Breadcrumb>
          {/* without modal false the dialog that this dropdown opens cause the website to get stuck  */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button className="text-black" variant={"ghost"}>
                <CiMenuKebab />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setUpdateAgentDilogOpen(true)}
                className="flex items-center gap-x-3"
              >
                <PencilIcon className="size-4 text-black" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteAgent}
                className="flex items-center gap-x-3"
              >
                <TrashIcon className="size-4 text-black" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-lg border bg-white">
          <div className="col-span-4 flex flex-col gap-y-5 p-4">
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
    </>
  );
};

export default AgentId;
