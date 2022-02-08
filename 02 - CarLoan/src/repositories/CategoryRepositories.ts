import { CategoryModel } from "../model/Category";

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
  name: string
  description: string
}

class CategoriesRepositories {
  private categories: CategoryModel[];

  constructor() {
    this.categories = [];
  }

  // Método para criar uma nova categoria.
  create({name, description}: ICreateCategoryDTO): void {
    // Dessa forma o constructor do CategoryProps irá criar o id.
    const category = new CategoryModel();
    
    // Uma forma mais rápida de atribuir os valores para um objeto;
    Object.assign(category, {
      name, 
      description, 
      created_at: new Date()
    })

       
    this.categories.push(category)
  }

  findByName(name: string): CategoryModel {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  list(): CategoryModel[] {
    return this.categories;
  }
}

export { CategoriesRepositories }