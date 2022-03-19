import {Request, Response} from "express"
import { container } from 'tsyringe';
import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      daily_rate,
      brand,
      category_id,
      description,
      fine_amount,
      license_plate
    } = request.body


    const createCarUseCase = container.resolve(CreateCarUseCase)

    const car = await createCarUseCase.execute({
      name,
      daily_rate,
      brand,
      category_id,
      description,
      fine_amount,
      license_plate
    })

    return response.status(201).json(car)
  }
}

export { CreateCarController }