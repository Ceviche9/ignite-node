import { CategoryModel } from "../../model/Category";

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
  name: string
  description: string
}

// Contrato que facilita a implementação desse subtipo em várias classes
interface ICategoriesRepository {
  findByName(name: string): CategoryModel
  list(): CategoryModel[]
  create({name, description}: ICreateCategoryDTO): void
}

export { ICategoriesRepository, ICreateCategoryDTO }