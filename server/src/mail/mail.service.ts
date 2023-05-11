import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/users.model';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: User, numbers: number[]) {
        return await this.mailerService.sendMail({
            to: user.email,
            from: '"Support Team" <support@example.com>',
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation',
            context: {
                name: user.login,
                numbers
            },
        });
    }
}
