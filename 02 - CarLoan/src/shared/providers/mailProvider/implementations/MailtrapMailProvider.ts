import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";
import handlebars from "handlebars"
import fs from "fs"

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5571233469788a",
        pass: "86bd9cc6d1c4ec"
      }
    })
  }

  async sendMail(
    to: string, 
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const templateParse = handlebars.compile(templateFileContent)

    const templateHTML = templateParse(variables)

    await this.transporter.sendMail({
      to: {
        name: "Teste",
        address: to
      },
      from: {
        name: "Carloan",
        address: "<noreplay@carloan.com.br>"
      },
      subject,
      html: templateHTML
    })
  }
}