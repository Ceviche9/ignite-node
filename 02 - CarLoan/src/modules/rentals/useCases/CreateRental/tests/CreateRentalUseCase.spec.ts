import dayjs from "dayjs"
import { RentalsRepositoryInMemory } from "@modules/rentals/implementations/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/infra/http/errors/AppError"
import { CreateRentalUseCase } from "../CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/implementations/Cars/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsProvider: DayjsDateProvider

describe("Create a rental", () => {
  const day = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    dayjsProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, 
      dayjsProvider,
      carsRepositoryInMemory
    )
  })

  it("should be able to create a new rental", async() => {
    const car = await carsRepositoryInMemory.create({
      name: "Fake-Car",
      description: "Fake-Description-Car",
      daily_rate: 100,
      brand: "Brand",
      fine_amount: 60,
      license_plate: "ABC-1234",
      category_id: "category_id",
    })

    const rental = await createRentalUseCase.execute({ 
      user_id: "123456",
      car_id: car.id,
      expected_return_date: day,
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental for a car there is already rented", async() => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Fake-Car",
        description: "Fake-Description-Car",
        daily_rate: 100,
        brand: "Brand",
        fine_amount: 60,
        license_plate: "ABC-1234",
        category_id: "category_id",
      })

      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: car.id,
        expected_return_date: day,
      })
  
      await createRentalUseCase.execute({ 
        user_id: "654321",
        car_id: car.id,
        expected_return_date: day,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental for a user with a open rental", async() => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Fake-Car",
        description: "Fake-Description-Car",
        daily_rate: 100,
        brand: "Brand",
        fine_amount: 60,
        license_plate: "ABC-1234",
        category_id: "category_id",
      })

      const car2 = await carsRepositoryInMemory.create({
        name: "Fake-Car",
        description: "Fake-Description-Car",
        daily_rate: 100,
        brand: "Brand",
        fine_amount: 60,
        license_plate: "CBA-1234",
        category_id: "category_id",
      })


      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: car.id,
        expected_return_date: day,
      })
  
      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: car2.id,
        expected_return_date: day,
      })
    }).rejects.toBeInstanceOf(AppError)
  })


  it("should not be able to create a new rental with a invalid return date", async() => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Fake-Car",
        description: "Fake-Description-Car",
        daily_rate: 100,
        brand: "Brand",
        fine_amount: 60,
        license_plate: "ABC-1234",
        category_id: "category_id",
      })

      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      })

    }).rejects.toBeInstanceOf(AppError)
  })
})