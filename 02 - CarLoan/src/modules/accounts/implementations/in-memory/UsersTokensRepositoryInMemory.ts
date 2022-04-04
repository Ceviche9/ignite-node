import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens ";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UsersTokens[] = []

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UsersTokens> {
    const usersToken = new UsersTokens()

    Object.assign(usersToken, {
      expires_date, refresh_token, user_id
    })

    this.usersTokens.push(usersToken)

    return usersToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
    return this.usersTokens.find(ut => 
      ut.user_id === user_id && ut.refresh_token === refresh_token
    )
  }

  async deleteById(id: string): Promise<void> {
    const usersTokens = this.usersTokens.find(ut => ut.id === id)
    this.usersTokens.splice(
      this.usersTokens.indexOf(usersTokens)
    )
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    return this.usersTokens.find(ut => ut.refresh_token === refresh_token)
  }

}

export { UsersTokensRepositoryInMemory }