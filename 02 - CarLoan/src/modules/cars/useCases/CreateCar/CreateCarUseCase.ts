import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/Cars/ICarsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    daily_rate,
    brand,
    category_id,
    description,
    fine_amount,
    license_plate
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensPlate(license_plate)

    if(carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      name,
      daily_rate,
      brand,
      category_id,
      description,
      fine_amount,
      license_plate
    })

    return car
  }
}

export { CreateCarUseCase }