import { SpecificationModel } from "../../model/Specification";
import { ISpecificationDTO, ISpecificationRepository } from "./ISpecificationRepository";


class SpecificationRepository implements ISpecificationRepository {
  private specification: SpecificationModel[]

  constructor() {
    this.specification = []
  }
  
  create({ name, description }: ISpecificationDTO): void {
    const specification = new SpecificationModel()
    
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    })
    
    this.specification.push(specification)
  }

  findByName(name: string): SpecificationModel {
    const specification = this.specification.find(specification => specification.name === name)

    if(specification) {
      return specification
    }
  }

}

export { SpecificationRepository }