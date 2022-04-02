import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { IUsersTokensRepository } from "@modules/accounts/implementations/IUsersTokensRepository"
import auth from "@config/auth"
import { AppError } from "@shared/infra/http/errors/AppError"
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider"

interface IPayload  {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private UsersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute(token: string): Promise<string> {
    // Para verificar se esse token é válido e pegando as informações de dentro dele.
    const {email, sub} = verify(token, auth.refresh_token_secret) as IPayload

    const user_id = sub

    // Para verificar se esse token pertence ao usuário.
    const userToken = await this.UsersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if(!userToken) {
      throw new AppError("Refresh Token Error")
    }

    // deletando o antigo token
    await this.UsersTokensRepository.deleteById(userToken.id)

    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    // Gerando um novo refresh_token
    const refresh_token = sign({ email }, auth.refresh_token_secret,
    {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    await this.UsersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }