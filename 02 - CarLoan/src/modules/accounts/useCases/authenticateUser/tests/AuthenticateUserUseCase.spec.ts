import { UsersRepositoryInMemory } from "../../../implementations/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import { AppError } from "@shared/infra/http/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/implementations/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider

describe("Authenticate user", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    )
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
    await expect(authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123456"
    })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })

  it("Should not be able to authenticate a user with incorrect credentials", async() => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "123456",
      name: "fake-user"
    }

    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect-password"
    })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
})