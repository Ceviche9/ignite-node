import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/implementations/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersTokens } from "../entities/UserTokens ";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>

  constructor() {
    this.repository = getRepository(UsersTokens)
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
    return await this.repository.findOne({ user_id, refresh_token })
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({ 
      expires_date,
      refresh_token, 
      user_id
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    return await this.repository.findOne({ refresh_token })
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

}

export { UsersTokensRepository }