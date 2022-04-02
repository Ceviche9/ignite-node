import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/implementations/IUsersRepository';
import { sign } from "jsonwebtoken"
import auth from '@config/auth';
 
import { compare } from "bcrypt"
import { AppError } from '@shared/infra/http/errors/AppError';
import { IUsersTokensRepository } from '@modules/accounts/implementations/IUsersTokensRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({email, password}: IRequest): Promise<IResponse> {
    // Verificar se o usuário existe
    const user = await this.usersRepository.findByEmail(email)
    const {
          expires_in_token, 
          refresh_token_secret, 
          token_Secret,
          expires_in_refresh_token,
          expires_refresh_token_days
    } = auth

    if (!user) throw new AppError("Email or password incorrect")
    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError("Email or password incorrect")
    // Gerar o token
    const token = sign({}, token_Secret, {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({ email }, refresh_token_secret,
      {
        subject: user.id,
        expiresIn: expires_in_refresh_token
      })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    })

    const tokenResponse: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenResponse
  }
}

export { AuthenticateUserUseCase }