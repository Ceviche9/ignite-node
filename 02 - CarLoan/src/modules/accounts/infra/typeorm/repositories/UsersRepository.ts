import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUser";
import { IUsersRepository } from "@modules/accounts/implementations/IUsersRepository";

class UsersRepository implements IUsersRepository{
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name, 
    email, 
    password, 
    driver_license,
    avatar,
    id
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, 
      email, 
      password, 
      driver_license,
      avatar,
      id
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({email});
    return user;
  }
    
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id })
    return user
  }

  async findByLicenses(driver_license: string): Promise<User> {
    return await this.repository.findOne({ driver_license })
  }
}

export { UsersRepository }