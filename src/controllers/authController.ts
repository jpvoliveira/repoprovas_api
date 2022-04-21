import { Request, Response } from 'express';
import * as authService from '../services/authService.js'

export async function signIn(req: Request, res: Response) {
  const userData = req.body
  const token = await authService.signIn(userData)
  res.send(token)
}

export async function signUp(req: Request, res: Response) {
  const userData = req.body
  await authService.signUp(userData)
  res.sendStatus(201)
}