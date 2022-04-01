import { container } from "tsyringe"

import "@shared/providers"

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { IUsersRepository } from "@modules/accounts/implementations/IUsersRepository"
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepositories"
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { ICategoriesRepository } from "@modules/cars/implementations/Category/ICategoriesRepository"
import { ISpecificationRepository } from "@modules/cars/implementations/Specification/ISpecificationRepository"
import { ICarsRepository } from "@modules/cars/implementations/Cars/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImageRepository } from "@modules/cars/implementations/CarsImage/ICarsImageRepository"
import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository"
import { IRentalsRepository } from "@modules/rentals/implementations/IRentalsRepository"
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository"
import { IUsersTokensRepository } from "@modules/accounts/implementations/IUsersTokensRepository"
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository"

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

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)
