import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersResponseDTO } from '../dtos/IUsersResponseDTO';

class UsersMapper {
  static toDTO({
    name,
    avatar,
    email,
    driver_license,
    isAdmin
  }: User): IUsersResponseDTO {
    return {
      name,
      avatar,
      email,
      driver_license,
      isAdmin
    }
  }
}

export { UsersMapper }