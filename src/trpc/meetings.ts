import { TRPCError } from "@trpc/server";
import z from "zod";
import { MeetingStatus } from "~/lib/type";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const meetingsRoute = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const data = await ctx.db.meetings.findUnique({
          where: { id: input.id, userId: ctx.session.user.id },
          include: {
            agent: true,
          },
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
        agentId: z.string().nullish(),
        status: z
          .enum([
            MeetingStatus.UPCOMING,
            MeetingStatus.ACTIVE,
            MeetingStatus.COMPLETED,
            MeetingStatus.PROCESSING,
            MeetingStatus.CANCELLED,
          ])
          .nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { search, page, pageSize, status, agentId } = input;
        const data = await db.meetings.findMany({
          where: {
            userId: ctx.session.user.id,
            name: {
              contains: search ?? "",
              mode: "insensitive",
            },
            status: status ?? undefined,
            agentId: agentId ?? "",
          },
          orderBy: [
            {
              createdAt: "desc",
            },
            { id: "desc" },
          ],
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            agent: true,
          },
        });
        const total = await ctx.db.meetings.count({
          where: {
            userId: ctx.session.user.id,
            name: {
              contains: search ?? "",
              mode: "insensitive",
            },
            status: status ?? undefined,
            agentId: agentId ?? undefined,
          },
        });

        const totalPages = Math.ceil(total / pageSize);
        const resultWithDuration = data.map((meeting) => ({
          ...meeting,
          duration:
            (new Date(meeting.endedAt).getTime() -
              new Date(meeting.startedAt!).getTime()) /
            1000,
        }));

        return {
          items: data,
          total,
          totalPages,
          duration: resultWithDuration,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch.meetings",
          cause: error,
        });
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        agentId: z.string().min(1, "Agent is required"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const meeting = await ctx.db.meetings.create({
          data: {
            name: input.name,
            agentId: input.agentId,
            userId: ctx.session.user.id,
            status: "UPCOMING",
          },
        });
        return meeting;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create agent",
          cause: error,
        });
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "Id is Required"),
        name: z.string().min(1, "Name is required"),
        agentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updateMeeting = await ctx.db.meetings.update({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          data: {
            name: input.name,
            agentId: input.agentId,
          },
        });

        if (!updateMeeting)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Meeting Not found",
          });

        return updateMeeting;
      } catch (error) {
        throw new Error("Serever Issue While updating the Agent");
      }
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "Id is Required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const removeMeeting = await ctx.db.meetings.delete({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
        });

        if (!removeMeeting)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Meeting Not found",
          });

        return removeMeeting;
      } catch (error) {
        throw new Error("Serever Issue While updating the Agent");
      }
    }),
});
