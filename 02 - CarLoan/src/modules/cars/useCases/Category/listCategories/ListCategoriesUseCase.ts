import { CategoryModel } from "../../../entities/Category"
import { inject, injectable } from "tsyringe"
import {ICategoriesRepository} from "../../../repositories/Category/ICategoriesRepository"

@injectable()
class ListCategoriesUseCase {
  // Utilizando o private a variável categoriesRepository fica disponível para toda a classe usar.
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  
  async execute(): Promise<CategoryModel[]> {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }