import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "@modules/accounts/implementations/IUsersTokensRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

@injectable()
class ResetPasswordUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string, password: string): Promise<void> {
    const usersToken = await this.usersTokensRepository.findByRefreshToken(token)

    if(!usersToken) {
      throw new AppError("Token invalid")
    }

    // Agora é preciso verificar se token ainda é válido pelo tempo de duração que ele tem.
  }
}

export { ResetPasswordUseCase }