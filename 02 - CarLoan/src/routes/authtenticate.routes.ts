import { Router } from "express";
import { ensureAthenticated } from "../middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.use(ensureAthenticated)
authenticateRoutes.post("/sessions", authenticateUserController.handle)

export { authenticateRoutes }