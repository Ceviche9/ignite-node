import { CategoryModel } from "../../model/Category";

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriesRepository {
  findByName(name: string): CategoryModel
  list(): CategoryModel[]
  create({name, description}: ICreateCategoryDTO): void
}

export { ICategoriesRepository, ICreateCategoryDTO }