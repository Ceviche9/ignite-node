interface IAddress {
  email: string
  name: string
}

interface IMessage {
  to: IAddress
  from: IAddress
  subject: string
  body: string
}

interface IMailProvider {
  sendMail(to: string, subject: string, body: string): Promise<void>
}

export { IMailProvider, IMessage }