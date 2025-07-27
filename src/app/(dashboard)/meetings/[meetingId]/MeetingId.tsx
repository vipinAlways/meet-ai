"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { api } from "~/trpc/react";
import Link from "next/link";
import { ChevronRightIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from "sonner";
import UpdateMeetingDialog from "./UpdateMeetingDialog";

const MeetingId = ({ meetingId }: { meetingId: string }) => {
  const [data] = api.meetings.getOne.useSuspenseQuery({ id: meetingId });
  const router = useRouter();
  const [onDialogOpen,setOnDialogOpen] = useState(false)
  const utils = api.useUtils();
    const removeMeeting = api.meetings.remove
      .useMutation({
        onSuccess: async () => {
          await utils.meetings.getMany.invalidate();
          toast("Agent has been removed", {});
          router.push("/meetings");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      })
  const onDeleteMeeting = () => {
   
     removeMeeting .mutate({ id: meetingId });
  };
  return (
    <div>
      <UpdateMeetingDialog initialValues={data} onOpenChange={setOnDialogOpen} open={onDialogOpen}/>
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
                  onClick={() => router.push("/meetings")}
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
                  onClick={() => router.push(`/agents/${meetingId}`)}
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
              onClick={() => setOnDialogOpen(true)}
              className="flex items-center gap-x-3"
            >
              <PencilIcon className="size-4 text-black" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDeleteMeeting}
              className="flex items-center gap-x-3"
            >
              <TrashIcon className="size-4 text-black" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MeetingId;
