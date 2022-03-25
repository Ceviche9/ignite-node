import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController"
import { Router } from "express"
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin"
import { ListCarsController } from "@modules/cars/useCases/ListCars/ListCarsController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/Specification/CreateCarSpecification/CreateCarSpecificationController"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.get("/available", listCarsController.handle)

carsRoutes.use(ensureAthenticated)
carsRoutes.use(ensureIsAdmin)
carsRoutes.post("/", createCarController.handle)
carsRoutes.post("/specifications/:id", createCarSpecificationController.handle)

export { carsRoutes }