import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController"
import { Router } from "express"
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin"
import { ListCarsController } from "@modules/cars/useCases/ListCars/ListCarsController"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()

carsRoutes.get("/available", listCarsController.handle)

carsRoutes.use(ensureAthenticated)
carsRoutes.use(ensureIsAdmin)
carsRoutes.post("/", createCarController.handle)

export { carsRoutes }