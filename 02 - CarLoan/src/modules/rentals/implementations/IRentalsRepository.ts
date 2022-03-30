import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO"
import { Rental } from "../infra/entities/Rental"

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>
  findById(rental_id: string): Promise<Rental>
  findByCarsId(car_id: string): Promise<Rental>
  findByUsersId(user_id: string): Promise<Rental>
}

export { IRentalsRepository }