import * as testsRepository from "../repositories/testsRepository.js";

export async function addTest(testData: testsRepository.InsertTest) {
  await testsRepository.insertTest(testData)
}

export async function findTestCategory() {
  const testCategoty = await testsRepository.findByCategory()
  return testCategoty
}

export async function findTestTeacher() {
  const testTeacher = await testsRepository.findByTeacher()
  return testTeacher
}