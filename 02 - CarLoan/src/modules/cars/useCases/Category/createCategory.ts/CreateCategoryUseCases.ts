import { inject, injectable } from "tsyringe"
import { ICategoriesRepository } from "../../../repositories/Category/ICategoriesRepository"

interface ICreateCategoryRequest {
  name: string
  description: string
}

// Permitindo que a classe seja injetável
@injectable()
class CreateCategoryUseCase {
  // Utilizando o private a variável categoriesRepository fica disponível para toda a classe usar.
  constructor(
    // Injetando o CategoriesRepository
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) 
    {}
  
  async execute({name, description}: ICreateCategoryRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if(categoryAlreadyExists) {
      throw new Error('Category already exists')
    }
  
    this.categoriesRepository.create({name, description})
  }
}

export { CreateCategoryUseCase }
