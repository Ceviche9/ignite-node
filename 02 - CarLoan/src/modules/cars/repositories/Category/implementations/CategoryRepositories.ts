import { getRepository, Repository } from "typeorm";
import { CategoryModel } from "../../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

// Responsável por utilizar os métodos necessários de acordo com o contrato.
// contrato = ICategoriesRepository
class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<CategoryModel>

  constructor() {
    this.repository = getRepository(CategoryModel);
  }

  // Método para criar uma nova categoria.
  async create({name, description}: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category)
  }

  async findByName(name: string): Promise<CategoryModel> {
    // Select * from categories where name = "name" limit = 1
    const category = await this.repository.findOne({ name })
    return category;
  }

  async list(): Promise<CategoryModel[]> {
    const categories = await this.repository.find()
    return categories;
  }
}

export { CategoriesRepository }