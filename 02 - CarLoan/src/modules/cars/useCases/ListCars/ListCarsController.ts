import {Request, Response} from "express"
import { container } from "tsyringe"
import { ListCarsUseCase } from "./LIstCarsUseCase"

interface IRequest {
  brand?: string
  name?: string
  category_id?: string
}

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {brand, name, category_id} = request.query as IRequest

    const listCarsUseCase = container.resolve(ListCarsUseCase)

    const cars = await listCarsUseCase.execute({
      brand, 
      name, 
      category_id
    });

    return response.json(cars)
  }
}

export {ListCarsController}