import { inject, injectable } from "tsyringe";
import { ICarsImageRepository } from "@modules/cars/implementations/CarsImage/ICarsImageRepository";
import { IStorageProvider } from "@shared/providers/storageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarsImageUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({car_id, images_name}: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImageRepository.create(car_id, image)
      await this.storageProvider.save(image, 'cars')
    })
  }
}

export { UploadCarsImageUseCase }