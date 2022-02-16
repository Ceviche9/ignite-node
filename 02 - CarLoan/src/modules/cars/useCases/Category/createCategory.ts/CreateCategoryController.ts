import {Request, Response} from "express"
import { CreateCategoryUseCase } from "./CreateCategoryUseCases"
import { container } from "tsyringe"

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {name, description} = request.body
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    
    try { 
      await createCategoryUseCase.execute({name, description})
    
      return response.status(201).send()
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateCategoryController }