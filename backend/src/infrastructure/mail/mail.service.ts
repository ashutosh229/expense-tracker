import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  async sendVerificationEmail(email: string, token: string) {
    const appUrl = this.config.get<string>('app.appUrl', 'http://localhost:3000');
    const verifyUrl = `${appUrl}/auth/verify-email?token=${token}`;
    const smtpHost = this.config.get<string>('mail.host');

    if (!smtpHost) {
      this.logger.warn(
        JSON.stringify({
          event: 'verification_email_skipped',
          reason: 'smtp_not_configured',
          email,
          verifyUrl,
        }),
      );
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: this.config.get<number>('mail.port', 587),
      secure: this.config.get<boolean>('mail.secure', false),
      auth: {
        user: this.config.get<string>('mail.user'),
        pass: this.config.get<string>('mail.pass'),
      },
    });

    await transporter.sendMail({
      from: this.config.get<string>(
        'mail.from',
        'Expense Tracker <no-reply@expense-tracker.local>',
      ),
      to: email,
      subject: 'Verify your Expense Tracker account',
      html: `
        <p>Welcome to Expense Tracker.</p>
        <p>Click the link below to verify your email address:</p>
        <p><a href="${verifyUrl}">Verify email</a></p>
        <p>This link expires in 24 hours.</p>
      `,
    });
  }
}
