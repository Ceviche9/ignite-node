import { Router } from "express"
import multer from "multer"
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin"
import { CreateCategoryController } from "@modules/cars/useCases/Category/createCategory.ts/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/Category/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/Category/listCategories/ListCategoriesController";


const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
})

const createCategoryControlle = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

// Dessa forma o express consegue passar automaticamente o request e o response.
categoriesRoutes.post("/", ensureAthenticated, ensureIsAdmin, createCategoryControlle.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post('/import',
  ensureAthenticated,
  ensureIsAdmin, 
  upload.single("file"), 
  importCategoryController.handle
)

export { categoriesRoutes }