import fs from "fs"

export const deleteFile = async (filename: string) => {

  // Para verificar se um arquivo já existe ou não em um diretório.
  try {
    await fs.promises.stat(filename)
  } catch(err) {
    return
  }
  // Para remover o arquivo
  await fs.promises.unlink(filename)
} 