import { ICategoriesRepository } from "../../../repositories/Category/ICategoriesRepository"

interface ICreateCategoryRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  // Utilizando o private a variável categoriesRepository fica disponível para toda a classe usar.
  constructor(private categoriesRepository: ICategoriesRepository) {}
  
  execute({name, description}: ICreateCategoryRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if(categoryAlreadyExists) {
      throw new Error('Category already exists')
    }
  
    this.categoriesRepository.create({name, description})
  }
}

export { CreateCategoryUseCase }
