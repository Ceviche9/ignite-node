import {Request, Response} from "express"
import { container } from "tsyringe"
import { RefreshTokenUseCase } from "./RefreshTokenUseCase"

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    // Existem três formas em que podemos receber os token => header, body ou query.
    const token = request.body.token ||
    request.headers['x-access-token'] ||
    request.query.token

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

    const refresh_token = await refreshTokenUseCase.execute(token)

    return response.json(refresh_token)
  }
}

export { RefreshTokenController }