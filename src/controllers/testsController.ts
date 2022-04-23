import {Request, Response} from 'express';
import * as testsServices from '../services/testsService.js'

export async function addTest(req: Request, res:Response) {
  const testData = req.body
  
  try {
    await testsServices.addTest(testData) 
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
  }
}

export async function findTestCategory(req: Request, res:Response) {
  const testCategory = await testsServices.findTestCategory()
  res.send(testCategory)
}

export async function findTestTeacher(req: Request, res:Response) {
  const testTeacher = await testsServices.findTestTeacher()
  res.send(testTeacher)
}