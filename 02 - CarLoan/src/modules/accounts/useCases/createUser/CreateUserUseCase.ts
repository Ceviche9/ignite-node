import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt"
import { IUsersRepository } from "@modules/accounts/implementations/IUsersRepository";
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUser';
import { AppError } from "@shared/infra/http/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name, 
    email, 
    password, 
    driver_license}: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    const licensesAlreadyExists = await this.usersRepository.findByLicenses(driver_license)

    if(userAlreadyExists) throw new AppError("User already exists")

    if(licensesAlreadyExists) throw new AppError("This licenses is already registered")

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name, 
      email, 
      password: passwordHash, 
      driver_license
    })
  }
}

export { CreateUserUseCase }