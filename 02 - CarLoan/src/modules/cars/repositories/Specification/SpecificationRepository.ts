import { SpecificationModel } from "../../entities/Specification";
import { ISpecificationDTO, ISpecificationRepository } from "./ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private specification: SpecificationModel[]

  constructor() {
    this.specification = []
  }
  
  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = new SpecificationModel()
    
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    })
    
    this.specification.push(specification)
  }

  async findByName(name: string): Promise<SpecificationModel> {
    const specification = this.specification.find(specification => specification.name === name)

    if(specification) {
      return specification
    }
  }

}

export { SpecificationRepository }