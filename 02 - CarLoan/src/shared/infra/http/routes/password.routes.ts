import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotMailPasswordController } from "@modules/accounts/useCases/sendForgotMailPassword/SendForgotMailPasswordController";
import { Router } from "express";

const passwordRoutes = Router()

const sendForgotMailPasswordController = new SendForgotMailPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRoutes.post("/forgot", sendForgotMailPasswordController.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)

export { passwordRoutes }