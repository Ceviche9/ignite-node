import { UsersRepositoryInMemory } from "@modules/accounts/implementations/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/implementations/in-memory/UsersTokensRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import { DayjsDateProvider } from "@shared/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/providers/mailProvider/implementations/in-memory/MailProviderInMemory";
import { AuthenticateUserUseCase } from "../../authenticateUser/AuthenticateUserUseCase";
import { SendForgotMailPasswordUseCase } from "../sendFotgorMailPasswordUseCase";


let sendForgotMailPasswordUseCase: SendForgotMailPasswordUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()

    sendForgotMailPasswordUseCase = new SendForgotMailPasswordUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it("Should be able to send a forgot password email to user", async () => {
    // Método do jest para verificar se uma função de uma classe foi chamada.
    const sendMail = jest.spyOn(mailProvider, "sendMail")
    
    // criando um usuário.
    await usersRepositoryInMemory.create({
      driver_license: "65213213",
      email: "test@email.com",
      name: "teste",
      password: "12345"
    })

    await sendForgotMailPasswordUseCase.execute("test@email.com")

    expect(sendMail).toHaveBeenCalled()
  })

  it("Should not be able to send a email if user does not exist",() => {
    expect(async () => {
      await sendForgotMailPasswordUseCase.execute("test@email.com")
    }).rejects.toEqual(new AppError("User does not exists!"))
  })

  it("Should be able to create a new users token", async () => {
    const generateToken = jest.spyOn(usersTokensRepositoryInMemory, "create")

    // criando um usuário.
    await usersRepositoryInMemory.create({
      driver_license: "65213213",
      email: "test@email.com",
      name: "teste",
      password: "12345"
    })


    await sendForgotMailPasswordUseCase.execute("test@email.com")
    
    expect(generateToken).toHaveBeenCalled()
  })
})