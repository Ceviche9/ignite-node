import { container } from "tsyringe"

import { ICategoriesRepository } from "../../modules/cars/repositories/Category/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/Category/CategoryRepositories"
import { ISpecificationRepository } from "../../modules/cars/repositories/Specification/ISpecificationRepository"
import { SpecificationRepository } from "../../modules/cars/repositories/Specification/SpecificationRepository"

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
)