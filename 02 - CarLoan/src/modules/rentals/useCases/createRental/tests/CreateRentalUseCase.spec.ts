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
  const day = dayjs().add(1, "day").toString()

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

    await expect(createRentalUseCase.execute({ 
        user_id: "654321",
        car_id: car.id,
        expected_return_date: day,
    })).rejects.toEqual(new AppError("Car already rented!"))
  })

  it("should not be able to create a new rental for a user with a open rental", async() => {
    await rentalsRepositoryInMemory.create({
      car_id: "123456",
      user_id: "123456",
      expected_return_date: new Date(day)
    })
    
    await expect( createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: "test",
        expected_return_date: day,
    })).rejects.toEqual(new AppError("User has a open rental!"))
  })


  it("should not be able to create a new rental with a invalid return date", async() => {
    const car = await carsRepositoryInMemory.create({
      name: "Fake-Car",
      description: "Fake-Description-Car",
      daily_rate: 100,
      brand: "Brand",
      fine_amount: 60,
      license_plate: "ABC-1234",
      category_id: "category_id",
    })

    await expect(createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayjs().toString(),
    })).rejects.toEqual(new AppError("Invalid return date!"))
  })
})