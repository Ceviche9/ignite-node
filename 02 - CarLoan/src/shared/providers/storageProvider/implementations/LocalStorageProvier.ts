import { IStorageProvider } from "../IStorageProvider";
import fs from "fs"
import { resolve } from "path"
import upload from "@config/upload";

class LocalStorageProvider implements IStorageProvider {
  // Mudando o arquivo de pasta.
  async save(file: string, folder: string): Promise<string> {
    // Copiar os arquivos que foram mandados para a pasta tmp e mandar para a sua respectiva pasta.
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    )

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${upload.tmpFolder}/${folder}`, file)

    try {
      await fs.promises.stat(fileName)
    } catch (err) {
      return
    }

    await fs.promises.unlink(fileName)
  }

}

export { LocalStorageProvider }