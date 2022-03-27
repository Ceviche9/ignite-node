import dayjs from "dayjs"
import { RentalsRepositoryInMemory } from "@modules/rentals/implementations/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/infra/http/errors/AppError"
import { CreateRentalUseCase } from "../CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/providers/DateProvider/implementations/DayjsDateProvider"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsProvider: DayjsDateProvider

describe("Create a rental", () => {
  const day = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    dayjsProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsProvider)
  })

  it("should be able to create a new rental", async() => {
    const rental = await createRentalUseCase.execute({ 
      user_id: "123456",
      car_id: "123456",
      expected_return_date: day,
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental for a car there is already rented", async() => {
    expect(async () => {
      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: "FAKE-CAR",
        expected_return_date: day,
      })
  
      await createRentalUseCase.execute({ 
        user_id: "654321",
        car_id: "FAKE-CAR",
        expected_return_date: day,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental for a user with a open rental", async() => {
    expect(async () => {
      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: "123456",
        expected_return_date: day,
      })
  
      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: "654321",
        expected_return_date: day,
      })
    }).rejects.toBeInstanceOf(AppError)
  })


  it("should not be able to create a new rental with a invalid return date", async() => {
    expect(async () => {
      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: "123456",
        expected_return_date: dayjs().toDate(),
      })

    }).rejects.toBeInstanceOf(AppError)
  })
})