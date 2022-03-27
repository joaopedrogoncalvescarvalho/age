import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import envConfig from '../../../config/env';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

import IMailProvider from '../models/IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || account.smtp.host,
        port: Number(process.env.SMTP_PORT) || account.smtp.port,
        auth: {
          user: process.env.SMTP_USER || account.user,
          pass: process.env.SMTP_PASS || account.pass,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to, from, subject, templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || envConfig.contact.team.name,
        address: from?.email || envConfig.contact.team.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
