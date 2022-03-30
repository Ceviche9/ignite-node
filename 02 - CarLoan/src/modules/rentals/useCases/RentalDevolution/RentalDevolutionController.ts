import { Response, Request } from "express"
import { container } from "tsyringe"
import { RentalDevolutionUseCase } from "./RentalDevolutionUseCase"

class RentalDevolutionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const rentalDevolutionUseCase = container.resolve(RentalDevolutionUseCase)

    const rental = await rentalDevolutionUseCase.execute({
      rental_id: id,
    })

    return response.status(200).json(rental)
  }
}

export { RentalDevolutionController }