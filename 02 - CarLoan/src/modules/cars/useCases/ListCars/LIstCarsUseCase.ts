import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/Cars/ICarsRepository";

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

class ListCarsUseCase {
  constructor(
    private carsRepository: ICarsRepository
  ) {}

  async execute({brand, category_id, name}: IRequest): Promise<Car[]> {
    return await this.carsRepository.findAvailable(brand, category_id, name)
  }
}

export { ListCarsUseCase }