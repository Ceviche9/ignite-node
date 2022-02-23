import { container } from "tsyringe"

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository"
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"

import { ICategoriesRepository } from "../../modules/cars/repositories/Category/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/Category/implementations/CategoryRepositories"
import { SpecificationRepository } from "../../modules/cars/repositories/Specification/implementations/SpecificationRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/Specification/ISpecificationRepository"

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)