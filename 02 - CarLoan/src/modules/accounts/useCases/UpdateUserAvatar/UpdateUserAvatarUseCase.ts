import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
  // Adicionar coluna avatar na tabela de users.

  // Refatorar usuário com a coluna avatar.

  // Configuração de upload do multer.

  // Criar regra de negócio do upload.

interface IRequest {
  user_id: string
  avatar_file: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({avatar_file, user_id}: IRequest): Promise<void> {
    const user  = await this.usersRepository.findById(user_id)

    user.avatar = avatar_file

    await this.usersRepository.create(user)
  }

} 

export { UpdateUserAvatarUseCase }