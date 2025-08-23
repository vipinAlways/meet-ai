import { useForm } from "react-hook-form";
import { z } from "zod";
import type { AgentGetOne } from "~/lib/type";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import GeneratedAvatar from "./GeneratedAvatar";
import { Button } from "./ui/button";
import { toast } from "sonner";

import { useSession } from "next-auth/react";


const agentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  instructions: z.string().min(1, "Instructions are required"),
});

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

const AgentForm = ({ initialValues, onCancel, onSuccess }: AgentFormProps) => {
  const session = useSession();
  const form = useForm<z.infer<typeof agentFormSchema>>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const utils = api.useUtils();

  const createMutate = api.agents.create.useMutation({
    onSuccess: async () => {
      await utils.agents.getMany.invalidate();
      //TODO:invalidata free tier
      onSuccess?.();
    },
    onError: () => {
      if (!session) toast.error("Unauthorized");
    },
  });
  const updateMutate = api.agents.update.useMutation({
    onSuccess: async () => {
      await utils.agents.getMany.invalidate();
      if (initialValues?.id) {
        await utils.agents.getOne.invalidate({ id: initialValues.id });
      }
      onSuccess?.();
    },
    onError: () => {
      //TODO:check that thing out
      if (!session) toast.error("Unauthorized");
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMutate.isPending ?? updateMutate.isPending;
  const onSubmit = (values: z.infer<typeof agentFormSchema>) => {
    if (isEdit) {
      updateMutate.mutate({ ...values, id: initialValues.id });
    } else {
      createMutate.mutate(values);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <GeneratedAvatar
            seed={form.watch("name") ?? ""}
            variant="bottsNeutral"
            className="size016 border"
          />
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
                    placeholder="e.g. Math tutor"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="h-16 rounded-md px-2 py-1.5 outline focus:outline-blue-800"
                    placeholder="Your are a math assistant, you help people with math problems."
                  />
                </FormControl>
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

export default AgentForm;
