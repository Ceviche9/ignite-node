import { IRentalsRepository } from "@modules/rentals/implementations/IRentalsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";


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
  }: IRequest): Promise<void> {
    //  O aluguel deve ter duração minima de 24 horas.
    const isAlreadyRented = await this.rentalsRepository.findByCarsId(car_id);

    if(isAlreadyRented) {
      throw new AppError("Car already rented!")
    }

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    const userHasAOpenRental = await this.rentalsRepository.findByUsersId(user_id)
    if (userHasAOpenRental) {
      throw new AppError("User has a open rental!")
    }

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
  
  }

}

export { CreateRentalUseCase }