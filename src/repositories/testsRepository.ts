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
  const { name, pdfUrl, categoryId, teacherDisciplineId } = testData;

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
    include: {
      categories: true,
      teachersDisciplines: {
        include: {
          teachers: true,
          disciplines: {
            include: {
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
    include: {
      categories: true,
      teachersDisciplines: {
        include: {
          disciplines: true,
          teachers: true,
        }
      }
    }
  })
}

export async function findByTeacherName(name: string) {
  return prisma.teachers.findMany({
    where: {
      name: name
    }
  })
}

export async function findByTeacherDisciplines(teacherId: number) {
  return prisma.teachersDisciplines.findMany({
    where: {
      teacherId: teacherId
    }
  })
}

export async function findByDisciplineName(disciplineName: string) {
  return prisma.disciplines.findMany({
    where: {
      name: disciplineName
    }
  })
}

export async function findCategoryId(categoryId: number) {
  return prisma.categories.findMany({
    where: {
      id: categoryId
    }
  })
}

export async function findById(categoryId: number) {
  return prisma.tests.findMany({
    where: {
      id: categoryId
    }
  })
}

export async function insertView(id: number, newView: number) {
  return prisma.tests.update({
    where: {
      id
    },
    data: {
      views: newView
    }
  })
}
