"use client";
import React from "react";
import MeetingForm from "~/components/MeetingForm";
import ResponsiveDialog from "~/components/ResponsiveDialog";
import type { MeetingGetOne } from "~/lib/type";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}
const UpdateMeetingDialog = ({
  onOpenChange,
  open,
  initialValues,
}: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Update a Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateMeetingDialog;
