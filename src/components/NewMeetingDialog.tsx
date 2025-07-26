"use client";
import React from "react";
import ResponsiveDialog from "./ResponsiveDialog";
import MeetingForm from "./MeetingForm";
import { useRouter } from "next/navigation";

interface NewMeetinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const NewMeetingDialog = ({ onOpenChange, open }: NewMeetinDialogProps) => {
    const router = useRouter()
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Start a new Meeting "
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id?: string) => {
          onOpenChange(false);
          if (id) {
            router.push(`/meeting/${id}`)
          }
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewMeetingDialog;
