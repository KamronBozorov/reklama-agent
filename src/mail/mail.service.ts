import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: any) {
    const url = `${process.env.api_url}/api/auth/client/activate/${user.activation_link}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Tasdiqlash linki',
      template: './confirmation',
      context: {
        name: `${user.name}`,
        url,
      },
    });
  }
}
