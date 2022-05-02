import { Request, Response } from 'express';
import * as testsServices from '../services/testsService.js'

export async function addTest(req: Request, res: Response) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token === 'null')
    throw { type: "Unauthorized", message: "Voce não esta logado" }

  const testData = req.body

  const teacherName = testData.teacherName.toUpperCase()
  const disciplineName = testData.disciplineName.toUpperCase()
  const categoryId = testData.categoryId

  const existingTeacher = await testsServices.findTeacher(teacherName)
  if (!existingTeacher[0])
    throw { type: 'Not Found', message: 'Este professor não é cadastrado' }

  const existingDiscipline = await testsServices.findDiscipline(disciplineName)
  if (!existingDiscipline[0])
    throw { type: 'Not Found', message: 'Esta materia não é cadastrada' }

  const existingCategory = await testsServices.findCategory(categoryId)
  if (!existingCategory[0])
    throw { type: 'Not Found', message: 'Digite o numero da prova: 1, 2 ou 3' }

  const teacherId = existingTeacher[0].id
  const teacherDiscipline = await testsServices.findTeacherDisciplines(teacherId)

  const newTestData = {
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: testData.categoryId,
    teacherDisciplineId: teacherDiscipline[0].id
  }

  await testsServices.addTest(newTestData, token)
  res.sendStatus(201)
}

export async function findTestCategory(req: Request, res: Response) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token === 'null')
    throw { type: "Unauthorized", message: "Voce não esta logado" }

  const testCategory = await testsServices.findTestCategory(token)
  res.send(testCategory)
}

export async function findTestTeacher(req: Request, res: Response) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token === 'null')
    throw { type: "Unauthorized", message: "Voce não esta logado" }

  const testTeacher = await testsServices.findTestTeacher(token)
  res.send(testTeacher)
}

export async function addView(req: Request, res: Response) {
  await testsServices.addView(req.body.id)
  res.sendStatus(201)
}