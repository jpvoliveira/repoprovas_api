import {Request, Response} from 'express';

export async function signIn(req: Request, res:Response) {
  const userData = req.body
  res.send(userData)
  console.log(userData)
}

export async function signUp(req: Request, res:Response) {
  
}