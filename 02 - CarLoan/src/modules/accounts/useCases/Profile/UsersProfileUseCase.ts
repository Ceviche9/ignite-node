import { IUsersRepository } from "@modules/accounts/implementations/IUsersRepository"
import { UsersMapper } from "@modules/accounts/mappers/UsersMapper"
import { AppError } from "@shared/infra/http/errors/AppError"
import { inject, injectable } from "tsyringe"
import { IUsersResponseDTO } from '../../dtos/IUsersResponseDTO';

@injectable()
class UsersProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute (id: string): Promise<IUsersResponseDTO> {
    const user = await this.usersRepository.findById(id)

    if(!user) throw new AppError("User not found!")

    return UsersMapper.toDTO(user)
  }
}

export { UsersProfileUseCase }