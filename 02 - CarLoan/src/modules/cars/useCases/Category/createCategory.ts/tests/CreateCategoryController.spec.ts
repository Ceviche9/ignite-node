import request from "supertest"
import { app } from "@shared/infra/http/app"
import { Connection } from "typeorm"

import createConnection from "@shared/infra/typeorm"
import { hash } from "bcrypt"
import {v4 as uuidV4} from "uuid"

let connection: Connection
describe("Category Controller test", () => {

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
        values('${id}', 'admin', 'admin@carloan.com.br', '${password}', true, 'XXXXXX','now()')
      `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })


  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@carloan.com.br",
      password: "admin"
    })

    const { token } = responseToken.body


    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({ 
      authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(201)
  })


  it("should be not able to create a new category with the same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@carloan.com.br",
      password: "admin"
    })

    const { token } = responseToken.body


    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({ 
      authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(400)
  })
})