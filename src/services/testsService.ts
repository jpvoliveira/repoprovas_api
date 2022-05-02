import * as testsRepository from "../repositories/testsRepository.js";
import * as usersRepository from "../repositories/usersRepository.js";
import jwt from 'jsonwebtoken';
const key = process.env.JWT_SECRET;

export async function addTest(testData: testsRepository.InsertTest, token: string) {
  const dataToken = jwt.verify(token, key).toString();
  
  const dataUser = await usersRepository.findByEmail(dataToken)
  if (!dataUser) {
    throw {type: "Unauthorized", message: "Entre na sua conta para continuar!"}
  }

  await testsRepository.insertTest(testData)
}

export async function findTestCategory(token: string) {
  const dataToken = jwt.verify(token, key).toString();
  
  const dataUser = await usersRepository.findByEmail(dataToken)
  if (!dataUser) {
    throw {type: "Unauthorized", message: "Entre na sua conta para continuar!"}
  }

  const testCategoty = await testsRepository.findByCategory()
  return testCategoty
}

export async function findTestTeacher(token: string) {
  const dataToken = jwt.verify(token, key).toString();
  
  const dataUser = await usersRepository.findByEmail(dataToken)
  if (!dataUser) 
    throw {type: "Unauthorized", message: "Entre na sua conta para continuar!"}

  const testTeacher = await testsRepository.findByTeacher()
  return testTeacher
}

export async function findTeacher(teacherName: string) {
  const existingTeacher = await testsRepository.findByTeacherName(teacherName)
  return existingTeacher
}

export async function findTeacherDisciplines(teacherId: number) {
  const teacherDisciplineId = await testsRepository.findByTeacherDisciplines(teacherId)
  return teacherDisciplineId
}

export async function findDiscipline(disciplineName: string) {
  const existingDiscipline = await testsRepository.findByDisciplineName(disciplineName)
  return existingDiscipline
}

export async function findCategory(categoryId: number) {
  const existingCategory = await testsRepository.findCategoryId(categoryId)
  return existingCategory
}

export async function addView(id: number) {
  const searchViewTest = await testsRepository.findById(id)
  const newView = searchViewTest[0].views + 1
  const insertView = await testsRepository.insertView(id, newView)
  console.log(insertView)
  return insertView
}