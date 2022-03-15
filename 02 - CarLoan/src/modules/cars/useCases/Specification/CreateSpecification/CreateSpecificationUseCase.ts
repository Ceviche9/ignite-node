import { inject, injectable } from "tsyringe"
import { AppError } from "@shared/infra/http/errors/AppError"
import { ISpecificationRepository } from "../../../repositories/Specification/ISpecificationRepository"

interface ISpecificationRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {

  constructor(
    @inject('SpecificationRepository')
    private SpecificationRepository: ISpecificationRepository) 
    {}

  async execute({name, description}: ISpecificationRequest): Promise<void> {
    const specificationAlreadyExists = await this.SpecificationRepository.findByName(name)

    if(specificationAlreadyExists) {
      throw new AppError('Specification already exists')
    }

    await this.SpecificationRepository.create({name, description})
  }

}

export { CreateSpecificationUseCase }