import { TRPCError } from "@trpc/server";
import JSONL from "jsonl-parse-stringify";
import z from "zod";
import generateAvatatUri from "~/lib/avatar";
import { streamVideo } from "~/lib/stream-videos";
import { MeetingStatus, type StreamTranscriptItem } from "~/lib/type";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const meetingsRoute = createTRPCRouter({
  getTranscript: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const existingMeeting = await db.meetings.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
      if (!existingMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "not able to find the meeting",
        });
      }

      if (!existingMeeting.transcriptUrl) {
        return [];
      }
      const transcript = await fetch(existingMeeting.transcriptUrl)
        .then((res) => res.text())
        .then((text) => JSONL.parse<StreamTranscriptItem>(text))
        .catch(() => []);

      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      const userSpeakers = await ctx.db.user
        .findMany({
          where: {
            id: {
              in: speakerIds,
            },
          },
        })
        .then((users) =>
          users.map((user) => ({
            ...user,
            image:
              user.image ??
              generateAvatatUri({ seed: user.name!, variant: "initials" }),
          })),
        );
      const agentsSpeakers = await ctx.db.agents
        .findMany({
          where: {
            id: {
              in: speakerIds,
            },
          },
        })
        .then((agents) =>
          agents.map((agent) => ({
            ...agent,
            image:
              generateAvatatUri({ seed: agent.name, variant: "initials" }),
          })),
        );

        const speakers = [...userSpeakers  , ...agentsSpeakers]

        const transcriptWithSpeakers = transcript.map(item => {
          const speaker = speakers.find(speak=>speak.id === item.speaker_id)

          if(!speaker){
            return {
              ...item,
              user:{
                name:"UNKNOWN",
                image:generateAvatatUri({seed:"UNKNOWN",variant:"initials"})
              }
            }
          }

          return {
            ...item,
            user:{
              name:speaker.name,
              image:speaker.image
            }
          }
        })

        return transcriptWithSpeakers
    }),
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

        const resultWithDuration = {
          ...data,
          duration:
            (new Date(data.endedAt).getTime() -
              new Date(data.startedAt!).getTime()) /
            1000,
        };

        return resultWithDuration; // ✅ only return JSON
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
            ...(status ? { status } : {}),
            ...(agentId ? { agentId } : {}),
          },
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
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

        const call = streamVideo.video.call("default", meeting.id);

        await call.create({
          data: {
            created_by_id: ctx.session.user.id,
            custom: {
              meetingId: meeting.id,
              meetingName: meeting.name,
            },
            settings_override: {
              transcription: {
                language: "en",
                mode: "auto-on",
                closed_caption_mode: "auto-on",
              },
              recording: {
                mode: "auto-on",
                quality: "1080p",
              },
            },
          },
        });

        const existingAgent = await ctx.db.agents.findFirst({
          where: {
            id: meeting.agentId,
          },
        });

        if (!existingAgent) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Agent not found",
          });
        }

        await streamVideo.upsertUsers([
          {
            id: existingAgent.id,
            name: existingAgent.name,
            role: "user",
            image: generateAvatatUri({
              seed: existingAgent.name,
              variant: "botttsNeutral",
            }),
          },
        ]);
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
        console.log(error);
        throw new Error("Server Issue While updating the Agent");
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
        throw new Error("Server Issue While updating the Agent" + error);
      }
    }),
  generateToken: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      console.log("user is not authenticated");
    }
    await streamVideo.upsertUsers([
      {
        id: ctx.session.user.id,
        name: user?.name ?? "user",
        role: "admin",
        image:
          ctx.session.user.image ??
          generateAvatatUri({
            seed: user?.name ?? `@user${Math.random() * 10000}`,
            variant: "initials",
          }),
      },
    ]);

    const token = streamVideo.generateUserToken({
      user_id: ctx.session.user.id,
    });

    return token;
  }),
});
