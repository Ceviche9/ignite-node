import {Request, Response} from "express"

import { container } from "tsyringe"
import { UsersProfileUseCase } from "./UsersProfileUseCase"

class UsersProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id }  = request.user
    const usersProfileUseCase = container.resolve(UsersProfileUseCase)

    const user = await usersProfileUseCase.execute(id)

    return response.json(user)
  }
}


export { UsersProfileController }