
// /pages/api/auth/pending-user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { db } from "~/server/db"; // adjust path to your db client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  const pendingUser = await db.pendingUser.findUnique({ where: { email } });

  if (existingUser || pendingUser) {
    return res.status(400).json({ message: "User already exists or is pending" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.pendingUser.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return res.status(200).json({ message: "Pending user created" });
}
