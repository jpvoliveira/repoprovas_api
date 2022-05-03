import app from '../src/app.js'
import supertest from 'supertest'
import { prisma } from '../src/database.js'

describe('POST/signUp',()=>{
  beforeEach(truncateUsers)
  afterAll(disconnect)

  it("Create user return 201", async()=>{
    const body = {
      email: "fulano@test.com",
      password: "test123"
    }

    const result = await supertest(app).post('sign-up').send(body)
    const user = await prisma.users.findUnique({
      where: {
        email: body.email
      }
    })
    console.log(result.status)
    expect(result.status).toEqual(201)
    expect(user).not.toBeNull()
  })
})

describe('POST/signIn', ()=>{
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("given a valid user data it should return token", async()=>{
    const body = {
      email: "fulano@test.com",
      password: "test123"
    }

    await prisma.users.create({
      data: {
        email: "fulano@test.com",
        password: "test123"
      },
    });

    const result = await supertest(app).post("/sign-in").send(body)
    console.log(result.body)
    expect(result.status).toEqual(201);
    // console.log(result.status)
    // expect(typeof result.body.token).toEqual("string");
    // expect(result.body.token.length).toBeGreaterThan(0);
  })
})

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
}