import { container } from "tsyringe"
import { IDateProvider } from "./DateProvider/IDateProvider"
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider"
import { IMailProvider } from "./mailProvider/IMailProvider"
import { EtherealMailProvider } from "./mailProvider/implementations/EtherealMailProvider"
import { MailtrapMailProvider } from "./mailProvider/implementations/MailtrapMailProvider"
import { LocalStorageProvider } from "./storageProvider/implementations/LocalStorageProvier"
import { S3StorageProvider } from "./storageProvider/implementations/S3StorageProvider"
import { IStorageProvider } from "./storageProvider/IStorageProvider"

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

// Para que a instância seja criada no momento em que a aplicação em "buildada".
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)

container.registerSingleton<IMailProvider>(
  "MailtrapMailProvider",
  MailtrapMailProvider
)

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
)