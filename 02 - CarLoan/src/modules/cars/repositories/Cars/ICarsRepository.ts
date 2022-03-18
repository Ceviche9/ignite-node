import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO"
import { Car } from "@modules/cars/infra/typeorm/entities/Car"

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensPlate(license_plate: string): Promise<Car>
}

export { ICarsRepository }