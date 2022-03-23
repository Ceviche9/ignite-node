import { getRepository, Repository } from 'typeorm';
import { Specification } from "../../../infra/typeorm/entities/Specification"
import { ISpecificationDTO, ISpecificationRepository } from "@modules/cars/implementations/Specification/ISpecificationRepository"

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name, 
      description 
    })

    await this.repository.save(specification);

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ name })
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids)
  }
}

export { SpecificationRepository }