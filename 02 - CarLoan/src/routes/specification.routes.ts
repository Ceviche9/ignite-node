import { request, Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/Specification/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecification";

const specificationRoutes = Router()

const specificationRepository = new SpecificationRepository()

specificationRoutes.post('/', (request, response) => {
  const {name, description} = request.body
  const createSpecificationServices = new CreateSpecificationService(specificationRepository)

  createSpecificationServices.execute({name, description})

  return response.status(201).send()

})

export {specificationRoutes}