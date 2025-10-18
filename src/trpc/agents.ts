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
          where: { id: input.id, userId: ctx.session.user.id },
        });
        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Not able to find Agent",
          });
        }
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch agent",
          cause: error,
        });
      }
    }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().min(1).max(100).default(10),
        search: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { search, page, pageSize } = input;
        const data = await db.agents.findMany({
          where: {
            userId: ctx.session.user.id,
            name: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
          orderBy: [
            {
              createdAt: "desc",
            },
            { id: "desc" },
          ],
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
        const total = await ctx.db.agents.count({
          where: {
            userId: ctx.session.user.id,
            name: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
        });

        const totalPages = Math.ceil(total / pageSize);

        if (data.length > 0) {
          return {
            items: data,
            total,
            totalPages,
          };
        } else {
          return {
            items: [],
            total: 0,
            totalPages: 0,
          };
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch agents",
          cause: error,
        });
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        instructions: z.string().min(1, "Instruction is required"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
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
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const removeAgent = await ctx.db.agents.delete({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
        });

        if (!removeAgent)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Agent Not found",
          });

        return removeAgent;
      } catch (error) {
        console.log(error);
        throw new Error("Serever Issue While Removing the Agent");
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "Id is Required"),
        name: z.string().min(1, "Name is required"),
        instructions: z.string().min(1, "Instruction is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updateAgent = await ctx.db.agents.update({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          data: {
            name: input.name,
            instructions: input.instructions,
          },
        });

        if (!updateAgent)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Agent Not found",
          });

        return updateAgent;
      } catch (error) {
        console.log(error);
        throw new Error("Serever Issue While updating the Agent");
      }
    }),
});
