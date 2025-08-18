"use client";

import { TabsContent } from "@radix-ui/react-tabs";
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import GeneratedAvatar from "~/components/GeneratedAvatar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { MeetingGetOne } from "~/lib/type";
import {format} from "date-fns"
import { Badge } from "~/components/ui/badge";
interface Props {
  data: MeetingGetOne;
}
const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="rounded-lg border bg-white px-3">
          <ScrollArea>
            <TabsList className="bg-background h-13 justify-start rounded-none p-0">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[static=active]:shadow-none"
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[static=active]:shadow-none"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>{" "}
              <TabsTrigger
                value="recording"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[static=active]:shadow-none"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[static=active]:shadow-none"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>
        <TabsContent value="recording">
          <div className="rounded-lg border bg-white px-4 py-5">
            <video
              src={data.recordingUrl!}
              className="w-full rounded-lg"
              controls
            />
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="rounded-lg border bg-white">
            <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
              <h1 className="text-2xl font-medium capitalize">{data.name}</h1>
              <div className="flex items-center gap-x-2">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 capitalize underline underline-offset-4"
                >
                    <GeneratedAvatar seed={data.agent.name} variant="bottsNeutral" className="size-5" />
                    {data.agent.name}
                </Link>
                <p>{data.startedAt ?  format(data.startedAt,"PPP"): ""}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4"/>
                <p>General summary</p>
              </div>
              <Badge variant={"outline"} className="flex items-center gap-x-2 [&svg]:size-4">
                        <ClockFadingIcon className="size-4"/>
                        
              </Badge>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompletedState;
