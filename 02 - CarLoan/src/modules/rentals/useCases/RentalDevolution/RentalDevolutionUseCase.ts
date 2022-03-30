import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "@modules/rentals/implementations/IRentalsRepository";
import { IDateProvider } from "@shared/providers/IDateProvider";
import { ICarsRepository } from "@modules/cars/implementations/Cars/ICarsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { Rental } from "@modules/rentals/infra/entities/Rental";

interface IRequest {
  rental_id: string
}

@injectable()
class RentalDevolutionUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id)
    const car = await this.carsRepository.findById(rental.car_id)

    // Se o carro for devolvido com menos de 24h deverá ser cobrado uma diária completa.
    const minimumDailyValue = 1
    // Valor total.
    let total = 0

    if(!rental) {
      throw new AppError("Rental does not exists!")
    }

    // Calculando quanto dias o usuário ficou com o carro
    let daily = this.dateProvider.compareDateInDays(
      new Date(rental.start_date),
      this.dateProvider.currentDate()
    )

    if(daily <= 0) {
      daily = minimumDailyValue
    }

    const currentDate = this.dateProvider.currentDate()
    // Quantos dias após o prazo de entrega o usuário ficou com o carro.
    const delay = this.dateProvider.compareDateInDays(
      currentDate, 
      new Date(rental.start_date)
    )

    // Calculando a multa
    if(delay <= 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }

    // Calculando o valor total.
    total += daily * car.daily_rate

    rental.end_date = this.dateProvider.currentDate()
    rental.total = total
    
    await this.carsRepository.updateAvailable(car.id, true)
    await this.rentalsRepository.create(rental)

    return rental
  }
}

export { RentalDevolutionUseCase }
