import { inject, injectable } from "tsyringe"
import { AppError } from "@shared/infra/http/errors/AppError"
import { ICategoriesRepository } from "@modules/cars/implementations/Category/ICategoriesRepository"

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
      throw new AppError('Category already exists')
    }
  
    this.categoriesRepository.create({name, description})
  }
}

export { CreateCategoryUseCase }
