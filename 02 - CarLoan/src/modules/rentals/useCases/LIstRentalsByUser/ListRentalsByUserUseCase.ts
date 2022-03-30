import { IRentalsRepository } from "@modules/rentals/implementations/IRentalsRepository"
import { Rental } from "@modules/rentals/infra/entities/Rental"
import { inject, injectable } from "tsyringe"

interface IRequest {
  user_id: string
}

@injectable()
class ListRentalsByUSerUseCase {
  constructor (
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    return await this.rentalsRepository.findByUsersId(user_id)
  }
}

export { ListRentalsByUSerUseCase }