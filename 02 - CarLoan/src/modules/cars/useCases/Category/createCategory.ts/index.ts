import { CategoriesRepository } from "../../../repositories/Category/CategoryRepositories";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCases";

const categoriesRepository = CategoriesRepository.getInstance()

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

// Importante lembrar que o que deve ser exportado é o controller.
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }
