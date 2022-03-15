import { getRepository, Repository } from "typeorm";
import { Category } from "../../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/Category/ICategoriesRepository";

// Responsável por utilizar os métodos necessários de acordo com o contrato.
// contrato = ICategoriesRepository
class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category);
  }

  // Método para criar uma nova categoria.
  async create({name, description}: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category)
  }

  async findByName(name: string): Promise<Category> {
    // Select * from categories where name = "name" limit = 1
    const category = await this.repository.findOne({ name })
    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.query("SELECT * FROM categories")
    return categories;
  }
}

export { CategoriesRepository }