import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime"

import upload from "@config/upload";
import { resolve } from "path"
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION
    })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalName)

    const contentType = mime.getType(originalName)

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      // Escolhendo as permissões do arquivo.
      ACL: "public-read",
      Body: fileContent,
      /* Quando for passada a url do arquivo para o usuário,
        esse arquivo será baixado automaticamente, para evitar que
        essa imagem seja baixada automaticamente, precisamos indicar
        o contentType.
      */ 
      ContentType: contentType
      // Para aguardar a inserção dentro da AWS
    }).promise()

    // PAra remover o arquivo de dentro do tmp.
    await fs.promises.unlink(originalName);

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
    }).promise()
  }
}

export { S3StorageProvider }