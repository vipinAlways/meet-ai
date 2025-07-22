import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const agentsRoute = createTRPCRouter({
  getMany: publicProcedure.query(async () => {
    try {
      const data = await db.agents.findMany();
        
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch agents",
        cause: error,
      });
    }
  }),
});
