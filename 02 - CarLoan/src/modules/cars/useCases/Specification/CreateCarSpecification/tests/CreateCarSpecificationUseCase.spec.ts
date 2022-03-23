import { CarsRepositoryInMemory } from "@modules/cars/implementations/Cars/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/implementations/Specification/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/infra/http/errors/AppError"
import { CreateCarSpecificationUseCase } from "../CreateCarSpecificationUseCase"


let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  })

  it("Should be able to add a new specification to a car" , async() => {
    const specifications_id = ["123456"]

    const car = await carsRepositoryInMemory.create(
      {
        name: "Fake-Car-1",
        description: "Car-Description",
        brand: "FAKE",
        daily_rate: 110.00,
        category_id: "category-id",
        fine_amount: 120,
        license_plate: "XXX-0001"
      }
    )

    const specification = await specificationRepositoryInMemory.create({
      description: "test",
      name: "test"
    })

    await createCarSpecificationUseCase.execute({
      car_id: car.id, 
      specifications_id: [specification.id]
    });
  })

  it("Should not be able to add a new specification to a non existent car" , async() => {
    expect(async() => {
      const car_id = "12345"
      const specifications_id = ["123456"]

      await createCarSpecificationUseCase.execute({car_id, specifications_id});
    }).rejects.toBeInstanceOf(AppError)

  })
})