import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { signIn } from "~/server/auth";
import { db } from "~/server/db";
import bcrypt from "bcrypt";

export const User = createTRPCRouter({
  newUser: publicProcedure
    .input(
      z.object({
        userName: z.string(),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long")
          .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character",
          ),
        email: z.string().email("Invalid email address"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existingUser = await db.user.findFirst({
          where: {
            email: input.email,
          },
        });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const createdUser = await db.user.create({
          data: {
            email: input.email,
            name: input.userName,
            password: hashedPassword,
          },
        });

        // Send magic link after user is created (optional if using email provider)
        // await signIn("email", {
        //   email: input.email,
        //   callbackUrl: "/",
        // });

        return { success: true, message: "User created and sign-in link sent" };
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
      }
    }),
});
