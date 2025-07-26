import { TRPCError } from "@trpc/server";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const meetingsRoute = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const data = await ctx.db.meetings.findUnique({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Not able to find meeting",
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
        const data = await db.meetings.findMany({
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
        const total = await ctx.db.meetings.count({
          where: {
            userId: ctx.session.user.id,
            name: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
        });

        const totalPages = Math.ceil(total / pageSize);

        return {
          items: data,
          total,
          totalPages,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch.meetings",
          cause: error,
        });
      }
    }),
});
