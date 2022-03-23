import { inject, injectable } from "tsyringe";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/implementations/Cars/ICarsRepository";

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({brand, category_id, name}: IRequest): Promise<Car[]> {
    return await this.carsRepository.findAvailable(brand, category_id, name)
  }
}

export { ListCarsUseCase }