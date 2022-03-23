import { ICarsRepository } from "@modules/cars/implementations/Cars/ICarsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "@modules/cars/implementations/Specification/ISpecificationRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

// @injectable()
class CreateCarSpecificationUseCase {
  constructor(
    // @inject("carsRepository")
    private carsRepository: ICarsRepository,
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({car_id, specifications_id}: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if(!car) {
      throw new AppError("Car not found.");
    }

    const specifications = await this.specificationRepository.findByIds(specifications_id)

    car.specifications = specifications

    await this.carsRepository.create(car)
  }
}

export { CreateCarSpecificationUseCase }