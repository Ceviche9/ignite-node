import { CategoryModel } from "../../entities/Category";

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
  name: string
  description: string
}

// Contrato que facilita a implementação desse subtipo em várias classes
interface ICategoriesRepository {
  findByName(name: string): Promise<CategoryModel>
  list(): Promise<CategoryModel[]>
  create({name, description}: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO }