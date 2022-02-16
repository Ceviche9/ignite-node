import { SpecificationModel } from "../../entities/Specification";

interface ISpecificationDTO {
  name: string
  description: string
}

// A criação de uma rota nova começa pala criação do contrato e da Model.
interface ISpecificationRepository {
  create({name, description}: ISpecificationDTO): Promise<void>
  findByName(name: string): Promise<SpecificationModel | null>
}

export {ISpecificationDTO, ISpecificationRepository}