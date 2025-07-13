import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const User = createTRPCRouter({
  newUser: publicProcedure
    .input(
      z.object({
        userName: z.string(),
        email: z.string().email("Invalid email address"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.update({
          where: {
            email: input.email,
          },
          data: {
            name: input.userName,
          },
        });

        return { success: true, message: "User created and sign-in link sent" };
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
      }
    }),
  existingUser: publicProcedure
  .input(z.object({ email: z.string().email() }))
  .query(async ({ ctx, input }) => {
   try {
     const existingUser = await ctx.db.user.findFirst({
      where: { email: input.email },
    });

    if (existingUser) {
      return true;
    } else {
      return false;
    }
   } catch (error) {
     console.error("Error checking existing user:", error);
     throw new Error("Failed to check existing user");
   }
  })
});
