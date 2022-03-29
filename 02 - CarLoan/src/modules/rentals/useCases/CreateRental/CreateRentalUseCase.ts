import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/implementations/IRentalsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { Rental } from '@modules/rentals/infra/entities/Rental';

import { IDateProvider } from "@shared/providers/IDateProvider";
import { ICarsRepository } from "@modules/cars/implementations/Cars/ICarsRepository";

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const isAlreadyRented = await this.rentalsRepository.findByCarsId(car_id);

    if(isAlreadyRented) {
      throw new AppError("Car already rented!")
    }
    const userHasAOpenRental = await this.rentalsRepository.findByUsersId(user_id)

    if (userHasAOpenRental) {
      throw new AppError("User has a open rental!")
    }    

    const currentDateFormatted = this.dateProvider.currentDate()
    const compareDate = this.dateProvider.compareDateInHours(currentDateFormatted, expected_return_date)

    if(compareDate < 24) {
      throw new AppError("Invalid return time")
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }