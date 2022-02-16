import { inject, injectable } from "tsyringe"
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
      throw new Error('Specification already exists')
    }

    await this.SpecificationRepository.create({name, description})
  }

}

export { CreateSpecificationUseCase }