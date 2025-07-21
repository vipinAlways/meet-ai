
import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const agentsRoute = createTRPCRouter({
        getMany :publicProcedure.input(z.object({
            text:z.string()
        })).query(async()=>{
            const data = await db.agents.findMany({})
            return data
        })
})