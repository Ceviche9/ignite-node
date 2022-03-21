import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController"
import { Router } from "express"
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin"

const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.use(ensureAthenticated)
carsRoutes.use(ensureIsAdmin)
carsRoutes.post("/", createCarController.handle)

export { carsRoutes }