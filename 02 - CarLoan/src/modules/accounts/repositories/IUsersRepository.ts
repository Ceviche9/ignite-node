import { ICreateUserDTO } from "../dtos/ICreateUser";


interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void> 
}

export { IUsersRepository }