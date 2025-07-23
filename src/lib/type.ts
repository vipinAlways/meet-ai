// e.g., src/types/trpc.ts

import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";

// Get the full output types of all procedures
type RouterOutputs = inferRouterOutputs<AppRouter>;

// Get the output type of agents.getOne
export type AgentGetOne = RouterOutputs["agents"]["getOne"];
