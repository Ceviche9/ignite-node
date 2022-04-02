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
  sendMail(
    to: string, 
    subject: string,
    variables: any,
    path: string
  ): Promise<void>
}

export { IMailProvider, IMessage }