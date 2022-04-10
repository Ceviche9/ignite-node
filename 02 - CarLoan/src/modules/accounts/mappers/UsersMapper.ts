import { instanceToInstance } from "class-transformer"
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersResponseDTO } from '../dtos/IUsersResponseDTO';

class UsersMapper {
  static toDTO({
    name,
    avatar,
    email,
    driver_license,
    isAdmin,
    avatar_url
  }: User): IUsersResponseDTO {
    const user = instanceToInstance({
      name,
      avatar,
      email,
      driver_license,
      isAdmin,
      avatar_url
    })

    return user
  }
}

export { UsersMapper }