import { inject, injectable } from "tsyringe";
import {v4 as uuidV4} from "uuid"
import { resolve } from "path"

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { EtherealMailProvider } from "@shared/providers/mailProvider/implementations/EtherealMailProvider";
import { MailtrapMailProvider } from "@shared/providers/mailProvider/implementations/MailtrapMailProvider";


@injectable()
class SendForgotMailPasswordUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    // @inject("EtherealMailProvider")
    // private mailProvider: EtherealMailProvider,
    @inject("MailtrapMailProvider")
    private mailProvider: MailtrapMailProvider,
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