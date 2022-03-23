import { Specification } from "../../infra/typeorm/entities/Specification";

interface ISpecificationDTO {
  name: string
  description: string
}

// A criação de uma rota nova começa pala criação do contrato e da Model.
interface ISpecificationRepository {
  create({name, description}: ISpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification | null>
  findByIds(ids: string[]): Promise<Specification[]>
}

export {ISpecificationDTO, ISpecificationRepository}