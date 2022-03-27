import { RentalsRepositoryInMemory } from "@modules/rentals/implementations/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/infra/http/errors/AppError"
import { CreateRentalUseCase } from "../CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create a rental", () => {

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it("should be able to create a new rental", async() => {
    const rental = await createRentalUseCase.execute({ 
      user_id: "123456",
      car_id: "123456",
      expected_return_date: new Date(),
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental for a car there is already rented", async() => {
    expect(async () => {
      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: "FAKE-CAR",
        expected_return_date: new Date(),
      })
  
      await createRentalUseCase.execute({ 
        user_id: "654321",
        car_id: "FAKE-CAR",
        expected_return_date: new Date(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental for a user with a open rental", async() => {
    expect(async () => {
      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: "123456",
        expected_return_date: new Date(),
      })
  
      await createRentalUseCase.execute({ 
        user_id: "123456",
        car_id: "654321",
        expected_return_date: new Date(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})