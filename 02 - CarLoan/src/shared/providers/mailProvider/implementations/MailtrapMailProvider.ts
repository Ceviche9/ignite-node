import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";
import handlebars from "handlebars"
import fs from "fs"

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.createClient();
  }
  
  private async createClient() {
    try { 
      this.transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      })
    } catch (err) {
      console.error(`MailtrapMailProvider - Error:\n${err}`);
    }

  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    if (!this.transporter) {
      await this.createClient();
    }
    
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