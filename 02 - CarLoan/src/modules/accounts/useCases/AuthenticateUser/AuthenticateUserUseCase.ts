
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { sign } from "jsonwebtoken"
 
import { compare } from "bcrypt"
import { AppError } from '@errors/AppError';

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
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({email, password}: IRequest): Promise<IResponse> {
    // Verificar se o usuário existe
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError("Email or password incorrect")
    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError("Email or password incorrect")
    // Gerar o token
    const token = sign({}, '9219562338f5cdf95e537c7a251af3f7', {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenResponse
  }
}

export { AuthenticateUserUseCase }