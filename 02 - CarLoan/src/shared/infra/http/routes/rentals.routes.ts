import { Router } from "express";
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { RentalDevolutionController } from "@modules/rentals/useCases/rentalDevolution/RentalDevolutionController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/lIstRentalsByUser/ListRentalsByUserController";

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const rentalDevolutionController = new RentalDevolutionController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalsRoutes.use(ensureAthenticated)
rentalsRoutes.post("/", createRentalController.handle)
rentalsRoutes.post("/devolution/:id", rentalDevolutionController.handle)
rentalsRoutes.get("/user", listRentalsByUserController.handle)

export { rentalsRoutes }