import { CategoriesRepository } from "../../../repositories/Category/CategoryRepositories";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)

// Importante lembrar que o que deve ser exportado é o controller.
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

export { listCategoriesController }