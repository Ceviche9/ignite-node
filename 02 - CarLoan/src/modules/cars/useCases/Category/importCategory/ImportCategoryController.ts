import {Request, Response} from 'express'
import { container } from "tsyringe"
import { ImportCategoryUseCase } from './ImportCategoryUseCase'


class ImportCategoryController {
  handle(request: Request, response: Response): Response {
    const { file } = request
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

    try { 
      importCategoryUseCase.execute(file)
  
      return response.send()

    }catch(err) {
      return response.status(400).json({message: err.message})
    }
  }

}

export { ImportCategoryController }