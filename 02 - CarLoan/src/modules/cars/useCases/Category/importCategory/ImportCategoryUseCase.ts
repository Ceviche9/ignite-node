import fs from "fs"
import { parse } from "csv-parse"
import { ICategoriesRepository } from "../../../repositories/Category/ICategoriesRepository";

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  // Responsável apenas para fazer a leitura
  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // Criando uma stream de leitura do arquivo.
      const stream  = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      // Por padrão o csv entende que o delimitador é virgula.
      const parseFile = parse()

      // O pipe pega um arquivo em streaming e envia os "pedaços" para algum lugar.
      stream.pipe(parseFile)

      // Para receber as linhas do arquivo que estão sendo lidas.
      parseFile.on('data', async (line) => {
        const [name, description] = line
        categories.push({ name, description})
      })// Quando o parse for finalizado
        .on("end", () => {
          // Depois de registrar os dados do arquivo ele pode ser deletado.
          fs.promises.unlink(file.path)
        resolve(categories)
      })
        .on("error", (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file)
    categories.map(async (category) => {
      const {name, description} = category

      const categoryAlreadyExists = this.categoriesRepository.findByName(name)

      if(!categoryAlreadyExists) {
        this.categoriesRepository.create({name, description})
      }
    })
  }
}

export { ImportCategoryUseCase }