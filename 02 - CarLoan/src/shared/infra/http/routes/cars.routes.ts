import multer from "multer"
import { Router } from "express"
import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController"
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin"
import { ListCarsController } from "@modules/cars/useCases/ListCars/ListCarsController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/Specification/CreateCarSpecification/CreateCarSpecificationController"
import { UploadCarsImageController } from "@modules/cars/useCases/UploadImage/UploadCarsImageController"
import uploadConfig from "@config/upload"

const carsRoutes = Router()
const upload = multer(uploadConfig)

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarsImageController = new UploadCarsImageController()

carsRoutes.get("/available", listCarsController.handle)

carsRoutes.use(ensureAthenticated)
carsRoutes.use(ensureIsAdmin)
carsRoutes.post("/", createCarController.handle)
carsRoutes.post("/specifications/:id", createCarSpecificationController.handle)
carsRoutes.post("/images/:id", upload.array("images") , uploadCarsImageController.handle)

export { carsRoutes }