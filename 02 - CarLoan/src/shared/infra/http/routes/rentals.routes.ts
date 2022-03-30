import { Router } from "express";
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { RentalDevolutionController } from "@modules/rentals/useCases/RentalDevolution/RentalDevolutionController";

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const rentalDevolutionController = new RentalDevolutionController()

rentalsRoutes.use(ensureAthenticated)
rentalsRoutes.post("/", createRentalController.handle)
rentalsRoutes.post("/devolution/:id", rentalDevolutionController.handle)

export { rentalsRoutes }