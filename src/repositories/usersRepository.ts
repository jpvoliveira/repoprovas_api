import { prisma } from "../database.js";

export interface User {
  id: number;
  email: string;
  password: string;
}

export type InsertUser = Omit<User, "id">;

export async function insert(userData:InsertUser) {
  const {email, password} = userData;
  
  return prisma.users.create({
    data: {
      email,
      password
    }
  })
}

export async function token(token: string, userId: number) {
  return prisma.sessions.create({
    data: {
      token,
      userId
    }
  })
}

export async function tokenById(userId: number) {
  return prisma.sessions.findFirst({
    where: { userId },
  })
}

export async function findByEmail(email: string) {
  return prisma.users.findUnique({
    where: { email },
  })
}