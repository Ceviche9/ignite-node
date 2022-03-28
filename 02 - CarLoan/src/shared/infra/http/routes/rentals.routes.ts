import { Router } from "express";
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";


const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

rentalsRoutes.use(ensureAthenticated)
rentalsRoutes.post("/", createRentalController.handle)

export { rentalsRoutes }