import { inject, injectable } from "tsyringe";
import {v4 as uuidV4} from "uuid"
import { resolve } from "path"

import { AppError } from "@shared/infra/http/errors/AppError";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "@modules/accounts/implementations/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/implementations/IUsersTokensRepository";
import { IMailProvider } from "@shared/providers/mailProvider/IMailProvider";


@injectable()
class SendForgotMailPasswordUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailtrapMailProvider")
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgotPassword.hbs")

    if(!user) {
      throw new AppError("User does not exists!")
    }

    const token = uuidV4()

    const expiresDate = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: expiresDate
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(email,"Recuperar senha", variables, templatePath)
  }

}

export { SendForgotMailPasswordUseCase }