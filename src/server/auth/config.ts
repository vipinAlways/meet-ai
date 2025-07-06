import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NodemailerProvider from "next-auth/providers/nodemailer";


import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [

  NodemailerProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_SERVER,
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  })
],


  callbacks: {
    async signIn({
      user,
    }: {
      user: {
        email?: string | null;
       
        name?: string | null;
      };
    }) {
      try {
        if (!user?.email) {
          return false;
        }

        const existingUser = await db.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (existingUser) {
          console.log("User already exists. Signing in.");
          return true;
        }

        await db.user.create({
          data: {
            email: user.email,
            name: user.name ?? "",
            image:  "",
          },
        });

        console.log("New user created successfully.");
        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
  },
} satisfies NextAuthConfig;
