import { AppError } from "../../../../../../errors/AppError"
import { CategoriesRepositoryInMemory } from "../../../../repositories/Category/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "../CreateCategoryUseCases"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepository: CategoriesRepositoryInMemory

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  })

  it("Should be able to create a new category", async() => {
    const category = {
      name: "Category test",
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const createdCategory = await categoriesRepository.findByName(category.name)

    expect(createdCategory).toHaveProperty("id")
  })

  it("Should not be able to create a category that already exists", async() => {
    expect(async() => {
      const category = {
        name: "Category test",
        description: "Category description test"
      }
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(AppError)

  })
})