"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,

} from "~/components/ui/breadcrumb";
import { api } from "~/trpc/react";
import Link from "next/link";
import {
  BanIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  VideoIcon,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
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
import EmptyState from "~/components/EmptyState";
import CompletedState from "~/app/call/components/CompletedState";

const MeetingId = ({ meetingId }: { meetingId: string }) => {
  const [data] = api.meetings.getOne.useSuspenseQuery({ id: meetingId });
  const router = useRouter();
  const [onDialogOpen, setOnDialogOpen] = useState(false);
  const [isCancelling] = useState(false);
  const utils = api.useUtils();
  const removeMeeting = api.meetings.remove.useMutation({
    onSuccess: async () => {
      await utils.meetings.getMany.invalidate();
      toast("Agent has been removed", {});
      router.push("/meetings");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onDeleteMeeting = () => {
    removeMeeting.mutate({ id: meetingId });
  };

  const isActive = data.status === "ACTIVE";
  const isUpcoming = data.status === "UPCOMING";
  const isCancelled = data.status === "CANCELLED";
  const isCompleted = data.status === "COMPLETED";
  const isProcessing = data.status === "PROCESSING";
  return (
    <div>
      <UpdateMeetingDialog
        initialValues={data}
        onOpenChange={setOnDialogOpen}
        open={onDialogOpen}
      />
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
                  My Meeting
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

      {isCancelled && (
        <div className="flex flex-col items-center gap-y-8 rounded bg-white px-4 py-4">
          <EmptyState
            title="Meeting cancelled"
            description="This meeting was cancelled"
            image="/svgs/cancellled.svg"
          />
        </div>
      )}
      {isActive && (
        <div className="flex flex-col items-center gap-y-8 rounded bg-white px-4 py-4">
          <EmptyState
            title="Meeting is Active"
            description="Meeting will end once all participants have left"
            image=".\svgs\empty.svg"
          />

          <div className="flex w-full items-center">
            <Button
              asChild
              className="w-full lg:w-auto"
              disabled={isCancelling}
            >
              <Link href={`/call/${meetingId}`}>
                <VideoIcon />
                Join Meeting
              </Link>
            </Button>
          </div>
        </div>
      )}
      {isCompleted && <div><CompletedState data={data}/></div>}
      {isUpcoming && (
        <div>
          <div className="flex flex-col items-center gap-y-8 rounded bg-white px-4 py-4">
            <EmptyState
              title="Not started Yet"
              description="Once you start this meeting, a summary will apear here"
              image="\svgs\empty.svg"
            />

            <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
              <Button
                variant={"secondary"}
                className="w-full lg:w-auto"
                onClick={() => {redirect("/meetings")}}
                disabled={isCancelling}
              >
                <BanIcon />
                Cancel Meeting
              </Button>
              <Button
                asChild
                className="w-full lg:w-auto"
                disabled={isCancelling}
              >
                <Link href={`/call/${meetingId}`}>
                  <VideoIcon />
                  Start Meeting
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      {isProcessing && (
        <div className="flex flex-col items-center gap-y-8 rounded bg-white px-4 py-4">
          <EmptyState
            title="Meeting completed"
            description="This meeting was completed, a summary will appear soon"
            image="/svgs/processing.svg"
          />
        </div>
      )}
    </div>
  );
};

export default MeetingId;
