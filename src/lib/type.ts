// e.g., src/types/trpc.ts

import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";

// Get the full output types of all procedures
type RouterOutputs = inferRouterOutputs<AppRouter>;

// Get the output type of agents.getOne
export type AgentGetOne = RouterOutputs["agents"]["getOne"];
export type MeetingGetOne = RouterOutputs["meetings"]["getOne"];
export type MeetingGetMAny = {
  items: RouterOutputs["meetings"]["getMany"]["items"];
  duration: RouterOutputs["meetings"]["getMany"]["duration"];
};

export enum MeetingStatus {
  UPCOMING = "UPCOMING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  PROCESSING = "PROCESSING",
  CANCELLED = "CANCELLED",
}
