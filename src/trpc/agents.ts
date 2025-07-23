import { TRPCError } from "@trpc/server";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const agentsRoute = createTRPCRouter({
 getOne: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const data = await ctx.db.agents.findUnique({
        where: { id: input.id },
      });

       return data!;
      
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch agent",
        cause: error,
      });
    }
  }),

  getMany: protectedProcedure.query(async () => {
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
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1, "Name is required"),
      instructions: z.string().min(1, "Instruction is required"),
    }))
    .mutation(async ({ input ,ctx}) => {
      try {
      
        const agent = await ctx.db.agents.create({
          data: {
            name: input.name,
            instructions: input.instructions,
            userId: ctx.session.user.id, 
          },
        });
        return agent;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create agent",
          cause: error,
        });
      }
    })
});
