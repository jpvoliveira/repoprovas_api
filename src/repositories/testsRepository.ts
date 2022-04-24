import { prisma } from '../database.js'

export interface Test {
  id: number;
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
}

export type InsertTest = Omit<Test, "id">;

export async function insertTest(testData: InsertTest) {
  const { name, pdfUrl, categoryId , teacherDisciplineId } = testData;
  
  return prisma.tests.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId
    }
  })
}

export async function findByCategory() {
  return prisma.tests.findMany({
    include:{
      categories: true,
      teachersDisciplines: {
        include: {
          disciplines: {
            include:{
              terms: true
            }
          }
        }
      }
    }
  })
}

export async function findByTeacher() {
  return prisma.tests.findMany({
    include:{
      categories: true,
      teachersDisciplines: {
        include: {
          teachers: true,
        }
      }
    }
  })
}

