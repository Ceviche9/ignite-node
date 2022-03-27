import { IRentalsRepository } from "@modules/rentals/implementations/IRentalsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { Rental } from '@modules/rentals/infra/entities/Rental';


interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
    const isAlreadyRented = await this.rentalsRepository.findByCarsId(car_id);

    if(isAlreadyRented) {
      throw new AppError("Car already rented!")
    }
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    const userHasAOpenRental = await this.rentalsRepository.findByUsersId(user_id)

    if (userHasAOpenRental) {
      throw new AppError("User has a open rental!")
    }

    // O aluguel deve ter a duração mínima de 24h.
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental
  }
}

export { CreateRentalUseCase }