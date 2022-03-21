import { Router } from "express";
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin"
import { CreateSpecificationController } from "../../../../modules/cars/useCases/Specification/CreateSpecification/CreateSpecificationController";

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.use(ensureAthenticated)
specificationRoutes.use(ensureIsAdmin)
specificationRoutes.post('/', createSpecificationController.handle)

export {specificationRoutes}