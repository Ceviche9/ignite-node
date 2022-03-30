import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/implementations/IRentalsRepository";
import { Rental } from "../../entities/Rental";


class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({ 
    car_id,
    expected_return_date,
    user_id
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({car_id, expected_return_date, user_id})

    await this.repository.save(rental)

    return rental
  }

  async findById(rental_id: string): Promise<Rental> {
    return await this.repository.findOne({ id: rental_id })
  }

  async findByCarsId(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id })
  }

  async findByUsersId(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id })
  }

}

export { RentalsRepository }