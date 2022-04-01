import { container } from "tsyringe"
import { Request, Response } from "express"
import { ListRentalsByUSerUseCase } from "./ListRentalsByUserUseCase"

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const listRentalsByUserUseCase = container.resolve(ListRentalsByUSerUseCase)
    const rentals = await listRentalsByUserUseCase.execute({user_id: id})

    return response.json(rentals)
  }
}

export { ListRentalsByUserController }