import { getRepository, Repository } from 'typeorm';
import { Specification } from "../../../infra/typeorm/entities/Specification"
import { ISpecificationDTO, ISpecificationRepository } from "@modules/cars/implementations/Specification/ISpecificationRepository"

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  
  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name, 
      description 
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name })

    return specification
  }

}

export { SpecificationRepository }