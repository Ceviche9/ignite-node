import { CategoriesRepository } from "../../../repositories/Category/CategoryRepositories";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCases";

export default ():CreateCategoryController  => {
  const categoriesRepository = new CategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  
  // Importante lembrar que o que deve ser exportado é o controller.
  const createCategoryController = new CreateCategoryController(createCategoryUseCase)
  
  return createCategoryController
}

