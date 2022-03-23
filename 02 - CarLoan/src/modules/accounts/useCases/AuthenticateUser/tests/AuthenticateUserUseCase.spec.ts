import { UsersRepositoryInMemory } from "../../../implementations/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import { ICreateUserDTO } from '../../../dtos/ICreateUser';
import { AppError } from "@shared/infra/http/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("Should be able to authenticate a user", async() => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "123456",
      name: "fake-user"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token");
  })

  it("Should not be able to authenticate a non existent user", async() => {
    expect(async() => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123456"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should not be able to authenticate a user with incorrect credentials", async() => {
    expect(async() => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "user@test.com",
        password: "123456",
        name: "fake-user"
      }
  
      await createUserUseCase.execute(user);
  
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect-password"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})