import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { MeetingGetOne } from "~/lib/type";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import CommandSelect from "./CommandSelect";
import GeneratedAvatar from "./GeneratedAvatar";
import NewAgentDialog from "./newAgentDialog";

const MeetingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  agentId: z.string(),
});

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

const MeetingForm = ({
  initialValues,
  onCancel,
  onSuccess,
}: MeetingFormProps) => {
  const session = useSession();
  const form = useForm<z.infer<typeof MeetingFormSchema>>({
    resolver: zodResolver(MeetingFormSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });
  const [agentSearch, setAgentSearch] = useState("");
  
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const query = api.agents.getMany.useQuery({
    pageSize: 100,
    search: agentSearch,
  });
  
  const utils = api.useUtils();

  const createMutate = api.meetings.create.useMutation({
    onSuccess: async (data) => {
      await utils.meetings.getMany.invalidate();
      
      onSuccess?.(data.id);
    },
    onError: () => {
      if (!session) toast.error("Unauthorized");
    },
  });
  const updateMutate = api.meetings.update.useMutation({
    onSuccess: async () => {
      await utils.meetings.getMany.invalidate();
      if (initialValues?.id) {
        await utils.meetings.getOne.invalidate({ id: initialValues.id });
      }
      onSuccess?.();
    },
    onError: () => {
      //TODO:check that thing out
      if (!session) toast.error("Unauthorized");
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMutate.isPending || updateMutate.isPending;
  const onSubmit = (values: z.infer<typeof MeetingFormSchema>) => {
    if (isEdit) {
      updateMutate.mutate({ ...values, id: initialValues.id });
    } else {
      createMutate.mutate(values);
    }
  };

  return (
    <div>
      <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="h-9 rounded-md px-2 outline focus:outline-blue-800"
                    placeholder="e.g. Math Consultation"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    option={(query.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-1">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="bottsNeutral"
                            className="size-6 border"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    className="h-14 rounded-md px-2 outline focus:outline-blue-800"
                    placeholder="Select an agent"
                  />
                </FormControl>

                <FormDescription className="flex items-center gap-x-2">
                  Not Found what you&#39;re lookin for
                  <Button type="button" className="hover:underline bg-blue-700 hover:bg-blue-700 text-white " 
                  onClick={()=>setOpenNewAgentDialog(true)}>
                    Create New Agent
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant={"ghost"}
                disabled={isPending}
                type="button"
                onClick={() => onCancel}
              >
                Cancel
              </Button>
            )}

            <Button
              variant={"ghost"}
              disabled={isPending}
              type="submit"
              onClick={() => onSuccess}
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MeetingForm;
