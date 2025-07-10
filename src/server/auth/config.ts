import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { db } from "~/server/db";
import { clearVerificationTokens } from "./clearVerificationTokens";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/api/auth/sign-in",
  },
  adapter: PrismaAdapter(db),
  providers: [
    // ➕ Credentials Provider for email + password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {  
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password as string, user.password as string);
        if (!isValid) return null;

        return user;
      },
    }),

    // ✅ Magic link provider (for signup/verification)
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_SERVER,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await clearVerificationTokens();
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    async session({ session, token }) {
      console.log("session callback called", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },

    // ✅ Handle account creation after magic link verification
    async signIn({ user }) {
      try {
        if (!user?.email) return false;

        // Already signed up
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) return true;

        // Find pending signup
        const pending = await db.pendingUser.findUnique({
          where: { email: user.email },
        });

        if (!pending) {
          console.log("No pending user found for", user.email);
          return false;
        }

        // Create user from pending data
        await db.user.create({
          data: {
            email: pending.email,
            name: pending.name,
            password: pending.hashedPassword,
          },
        });

        // Remove pending record
        await db.pendingUser.delete({
          where: { email: pending.email },
        });

        console.log("✅ New user created after magic verification");
        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
  },
} satisfies NextAuthConfig;
