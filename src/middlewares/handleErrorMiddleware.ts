import { NextFunction, Request, Response } from "express";

export function handleErrorMiddleware(error, req: Request, res: Response, next: NextFunction){
  if(error.type === 'Unauthorized'){
    return res.status(401).send(error.message)
  }
  if(error.type === 'Not Found'){
    return res.status(404).send(error.message)
  }
  if(error.type === 'Conflict'){
    return res.status(409).send(error.message)
  }
  if(error.type === 'Unprocessable Entity'){
    return res.status(422).send(error.message)
  }
}