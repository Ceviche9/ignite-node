import { getRepository, Repository } from 'typeorm';
import { SpecificationModel } from "../../../entities/Specification"
import { ISpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository"


class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<SpecificationModel>

  constructor() {
    this.repository = getRepository(SpecificationModel)
  }

  
  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name, 
      description 
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<SpecificationModel> {
    const specification = await this.repository.findOne({ name })

    return specification
  }

}

export { SpecificationRepository }