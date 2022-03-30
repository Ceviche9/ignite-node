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
    id,
    end_date,
    start_date,
    car_id,
    user_id,
    total,
    created_at,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      created_at,
      total: total || null,
      expected_return_date,
      end_date: end_date || null,
      start_date: start_date || new Date(),
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({ id })
  }

  async findByUsersId(user_id: string): Promise<Rental[]> {
    return await this.repository.find({ 
       where: { user_id },
       relations: ["car"]
    })
  }

  async findOpenRentalByCarsId(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { car_id, end_date: null },
    });
  }

  async findOpenRentalByUsersId(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { user_id, end_date: null },
    });
  }
}

export { RentalsRepository }