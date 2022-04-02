import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";

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

  async sendMail(to: string, subject: string, body: string): Promise<void> {
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
      html: body
    })
  }
}