import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/Specification/CreateSpecification/CreateSpecificationController";

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.post('/', createSpecificationController.handle)

export {specificationRoutes}