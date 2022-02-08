import { Router } from "express"
import { CategoryProps } from "../model/Category";

const categoriesRoutes = Router();

const categories: CategoryProps[] = [];

categoriesRoutes.post("/", (request, response) => {
  const {name, description} = request.body

  // Dessa forma o constructor do CategoryProps irá criar o id.
  const category = new CategoryProps();
  
  // Uma forma mais rápida de atribuir os valores para um objeto;
  Object.assign(category, {
    name, 
    description, 
    created_at: new Date()
  })

  categories.push(category)

  response.status(201).json({category})
})


export { categoriesRoutes }