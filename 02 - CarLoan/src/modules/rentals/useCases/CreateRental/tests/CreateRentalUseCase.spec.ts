import { RentalsRepositoryInMemory } from "@modules/rentals/implementations/in-memory/RentalSRepositoryInMemory"
import { CreateRentalUseCase } from "../CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create a rental", () => {


  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it("should be able to create a new rental", async() => {
    await createRentalUseCase.execute({ 
      user_id: "123456",
      car_id: "123456",
      expected_return_date: new Date(),
    })

  })

})