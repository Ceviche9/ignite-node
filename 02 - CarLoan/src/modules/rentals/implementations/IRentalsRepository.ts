import { Rental } from "../infra/entities/Rental"

interface IRentalsRepository {
  findByCarsId(car_id: string): Promise<Rental>
  findByUsersId(user_id: string): Promise<Rental>
}

export { IRentalsRepository }