import { CarsRepositoryInMemory } from "@modules/cars/repositories/Cars/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "../LIstCarsUseCase"


let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {

    // Nesse caso acessar diretamente o repositório não tem problema, já que estamos fazendo um teste. 
    await carsRepositoryInMemory.create(
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

    await carsRepositoryInMemory.create(
      {
        name: "Fake-Car-2",
        description: "Car-Description",
        brand: "FAKE",
        daily_rate: 110.00,
        category_id: "category-id",
        fine_amount: 120,
        license_plate: "XXX-0002"
      }
    )

    await carsRepositoryInMemory.create(
      {
        name: "Fake-Car-3",
        description: "Car-Description",
        brand: "FAKE",
        daily_rate: 110.00,
        category_id: "category-id",
        fine_amount: 120,
        license_plate: "XXX-0003"
      }
    )

    const cars = await listCarsUseCase.execute({})

    expect(cars).toHaveLength(3)
  })

  // TODO: Está listando todos os carros independente dos parâmetros enviados.
  it("should be able to list all available cars by brand", async() => {
    const car = await carsRepositoryInMemory.create(
      {
        name: "Fake-Car-1",
        description: "Car-Description",
        brand: "car-brand",
        daily_rate: 110.00,
        category_id: "category-id",
        fine_amount: 120,
        license_plate: "XXX-0001"
      }
    )

    await carsRepositoryInMemory.create(
      {
        name: "Fake-Car-2",
        description: "Car-Description",
        brand: "FAKE",
        daily_rate: 110.00,
        category_id: "category-id",
        fine_amount: 120,
        license_plate: "XXX-0002"
      }
    )

    await carsRepositoryInMemory.create(
      {
        name: "Fake-Car-3",
        description: "Car-Description",
        brand: "FAKE",
        daily_rate: 110.00,
        category_id: "category-id",
        fine_amount: 120,
        license_plate: "XXX-0003"
      }
    )

    const cars = await listCarsUseCase.execute({
      brand: "car-brand"
    })

    expect(cars).toEqual([car])
  })
})