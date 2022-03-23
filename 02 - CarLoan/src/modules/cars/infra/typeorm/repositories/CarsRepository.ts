import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/implementations/Cars/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({ 
    name, 
    description, 
    brand, 
    category_id, 
    daily_rate,
    fine_amount,
    license_plate
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name, 
      description, 
      brand, 
      category_id, 
      daily_rate,
      fine_amount,
      license_plate
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensPlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({license_plate})
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carQuery = this.repository
    // Um nome para utilizar para fazer as buscas
      .createQueryBuilder("c")
    // Indicando qual é o resultado esperado para o parâmetro escolhido
      .where("available = :available", {available: true})
    
      if(brand) {
        carQuery.andWhere("c.brand = :brand", { brand })
      }

      if(name) {
        carQuery.andWhere("c.name = :name", { name })
      }

      if(category_id) {
        carQuery.andWhere("c.category_id = :category_id", { category_id })
      }

      // Para poder rodar essa query
      const cars = await carQuery.getMany();
      
      return cars
  }
}

export { CarsRepository }