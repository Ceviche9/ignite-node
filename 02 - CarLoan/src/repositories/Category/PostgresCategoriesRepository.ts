import { CategoryModel } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): CategoryModel {
    console.log(name)
    return null
  }
  list(): CategoryModel[] {
    return null
  }
  create({name, description}: ICreateCategoryDTO): void {
    console.log(name, description)
  }
  
}

export { PostgresCategoriesRepository }