import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "@modules/accounts/implementations/IUsersTokensRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "@modules/accounts/implementations/IUsersRepository";
import { hash } from "bcrypt"


interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({token, password}: IRequest): Promise<void> {
    const usersToken = await this.usersTokensRepository.findByRefreshToken(token)

    if(!usersToken) {
      throw new AppError("Token invalid")
    }
    // Agora é preciso verificar se token ainda é válido pelo tempo de duração que ele tem.
    if(this.dateProvider.CompareIfBefore(usersToken.expires_date, this.dateProvider.currentDate())) {
      throw new AppError("Token expired")
    }
    // Pegando as informações do usuário
    const user = await this.usersRepository.findById(usersToken.user_id)

    // atualizando a senha
    user.password = await hash(password, 8)

    // salvando as alterações
    await this.usersRepository.create(user)

    // deletando o token da base de dados
    await this.usersTokensRepository.deleteById(usersToken.id)
  }
}

export { ResetPasswordUseCase }