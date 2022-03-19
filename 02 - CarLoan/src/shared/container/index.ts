import { container } from "tsyringe"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepositories"
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { ICategoriesRepository } from "@modules/cars/repositories/Category/ICategoriesRepository"
import { ISpecificationRepository } from "@modules/cars/repositories/Specification/ISpecificationRepository"
import { ICarsRepository } from "@modules/cars/repositories/Cars/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"

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

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)