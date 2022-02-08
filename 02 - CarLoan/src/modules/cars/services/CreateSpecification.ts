import { ISpecificationRepository } from "../repositories/Specification/ISpecificationRepository"

interface ISpecificationRequest {
  name: string
  description: string
}

class CreateSpecificationService {

  constructor(private SpecificationRepository: ISpecificationRepository) {}

  execute({name, description}: ISpecificationRequest): void {
    const specificationAlreadyExists = this.SpecificationRepository.findByName(name)

    if(specificationAlreadyExists) {
      throw new Error('Specification already exists')
    }

    this.SpecificationRepository.create({name, description})
  }

}

export { CreateSpecificationService }