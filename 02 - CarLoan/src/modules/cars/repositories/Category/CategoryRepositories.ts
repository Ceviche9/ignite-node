import { CategoryModel } from "../../model/Category";
import { ICategoriesRepository } from "./ICategoriesRepository";

// Responsável por utilizar os métodos necessários de acordo com o contrato.
// contrato = ICategoriesRepository
class CategoriesRepository implements ICategoriesRepository {
  private categories: CategoryModel[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  // Esse  método será responsável por criar uma instância ou repassar uma.
  public static getInstance(): CategoriesRepository {
    if(!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE
  }

  // Método para criar uma nova categoria.
  create({name, description}): void {
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

export { CategoriesRepository }