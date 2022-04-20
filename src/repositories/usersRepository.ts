import { connection } from "../database.js";

export interface User {
  id: number;
  email: string;
  password: string;
}

export type InsertUser = Omit<User, "id">;

export async function insert(userData:InsertUser) {
  const {email, password} = userData;
  
  await connection.query<User>(
    `INSERT INTO users ("email", "password") VALUES ($1, $2)`,
    [email, password]
  );
}

export async function token(token: string, userId: number) {
  await connection.query(
    `INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId]
  )
}

export async function tokenById(userId: number) {
  const result = await connection.query(
    `SELECT * FROM sessions WHERE "userId"=$1`, [userId]
  )
  return result.rows[0]
}

export async function findByEmail(email: string) {
  const result = await connection.query(
    'SELECT * FROM users WHERE email=$1', [email]
  );
  return result.rows[0];
}