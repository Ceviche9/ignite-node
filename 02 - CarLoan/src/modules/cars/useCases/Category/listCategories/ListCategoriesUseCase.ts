import { CategoryModel } from "../../../model/Category"
import {ICategoriesRepository} from "../../../repositories/Category/ICategoriesRepository"

class ListCategoriesUseCase {
  // Utilizando o private a variável categoriesRepository fica disponível para toda a classe usar.
  constructor(private categoriesRepository: ICategoriesRepository) {}
  
  execute(): CategoryModel[] {
    const categories = this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }