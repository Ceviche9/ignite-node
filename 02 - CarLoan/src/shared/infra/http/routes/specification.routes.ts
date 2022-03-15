import { Router } from "express";
import { ensureAthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/Specification/CreateSpecification/CreateSpecificationController";

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.use(ensureAthenticated)
specificationRoutes.post('/', createSpecificationController.handle)

export {specificationRoutes}