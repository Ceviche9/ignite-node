import { CarsRepositoryInMemory } from "@modules/cars/implementations/Cars/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/infra/http/errors/AppError"
import { CreateCarUseCase } from "../CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("Should be able to create a new car.", async() => {
    const car = await createCarUseCase.execute({
      name: "Fake-Car",
      description: "Fake-Description-Car",
      daily_rate: 100,
      brand: "Brand",
      fine_amount: 60,
      license_plate: "ABC-1234",
      category_id: "category_id",
    });

    expect(car).toHaveProperty("id")
  })
  
  it("Should not be possible to register a car with a license plate that has already been registered.", async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: "Fake-Car-1",
        description: "Fake-Description-Car",
        daily_rate: 100,
        brand: "Brand",
        fine_amount: 60,
        license_plate: "ABC-1234",
        category_id: "category_id",
      });

      await createCarUseCase.execute({
        name: "Fake-Car-2",
        description: "Fake-Description-Car",
        daily_rate: 100,
        brand: "Brand",
        fine_amount: 60,
        license_plate: "ABC-1234",
        category_id: "category_id",
      });
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be registered as available for rent by default.", async() => {
    const car = await createCarUseCase.execute({
      name: "Fake-Car",
      description: "Fake-Description-Car",
      daily_rate: 100,
      brand: "Brand",
      fine_amount: 60,
      license_plate: "ABC-1234",
      category_id: "category_id",
    });

    expect(car.available).toBe(true)
  })
})

