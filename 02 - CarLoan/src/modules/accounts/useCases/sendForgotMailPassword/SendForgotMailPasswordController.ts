import {Response, Request} from "express"
import { container } from "tsyringe"
import { SendForgotMailPasswordUseCase } from "./sendFotgorMailPasswordUseCase"

class SendForgotMailPasswordController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotMailPasswordController = container.resolve(SendForgotMailPasswordUseCase)
    
    await sendForgotMailPasswordController.execute(email)

    return response.status(200).send()
  }

}

export { SendForgotMailPasswordController }