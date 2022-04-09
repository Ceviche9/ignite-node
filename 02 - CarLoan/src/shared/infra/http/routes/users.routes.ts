import { Router } from "express"
import multer from "multer";
import { ensureAthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "@config/upload"
import { UsersProfileController } from "@modules/accounts/useCases/Profile/UsersProfileController";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const usersProfileController = new UsersProfileController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.use(ensureAthenticated)
usersRoutes.get('/profile', usersProfileController.handle)
usersRoutes.patch('/avatar', uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { usersRoutes }
