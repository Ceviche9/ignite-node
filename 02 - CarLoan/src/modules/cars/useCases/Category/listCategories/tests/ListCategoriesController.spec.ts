import request from "supertest"
import { app } from "@shared/infra/http/app"
import { Connection } from "typeorm"

import createConnection from "@shared/infra/typeorm"
import { hash } from "bcrypt"
import {v4 as uuidV4} from "uuid"

let connection: Connection
describe("List Categories test", () => {

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


  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@carloan.com.br",
      password: "admin"
    })

    const { token } = responseToken.body

    await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({ 
      authorization: `Bearer ${token}`
    })

    const response = await request(app).get("/categories")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toEqual("Category Supertest")
    expect(response.body[0].description).toEqual("Category Supertest")
  })
})