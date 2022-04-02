import { SendForgotMailPasswordController } from "@modules/accounts/useCases/sendForgotMailPassword/SendForgotMailPasswordController";
import { Router } from "express";

const passwordRoutes = Router()

const sendForgotMailPasswordController = new SendForgotMailPasswordController()

passwordRoutes.post("/forgot", sendForgotMailPasswordController.handle)

export { passwordRoutes }