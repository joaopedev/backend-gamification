"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let CustomMailService = class CustomMailService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendWelcomeEmail(email, username) {
        await this.mailerService.sendMail({
            to: email,
            sender: email,
            subject: 'Bem-vindo ao nosso serviço!',
            template: './welcome',
            context: {
                username,
            },
            html: `<p>Olá ${username}, bem-vindo ao nosso serviço!</p>`,
        });
    }
    async sendResetPasswordEmail(email, token) {
        await this.mailerService.sendMail({
            to: email,
            sender: email,
            subject: 'Recuperação de senha',
            template: './reset-password',
            context: {
                token,
            },
            html: `

  <head>
    <meta charset="UTF-8" />
    <title>Recuperação de Senha</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: Arial, sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f2f2f2; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="background-color: #45a9b0; padding: 20px;">
                <img src="https://i.ibb.co/ZT8mr79/logo.png" alt="Converge Que Cola" width="200" style="display: block;" />
              </td>
            </tr>
            <tr>
              <td style="padding: 30px 20px; text-align: center;">
                <h2 style="color: #45a9b0; margin-bottom: 10px;">Olá, {{name}}!</h2>
                <p style="color: #444; font-size: 16px; margin-bottom: 10px;">
                  Recebemos uma solicitação para redefinir sua senha.
                </p>
                <p style="color: #444; font-size: 16px; margin-bottom: 20px;">
                  Para isso, insira este <strong>código de acesso</strong> no seu aplicativo:
                </p>
                <p style="font-size: 36px; font-weight: bold; color: #d1349b; margin: 0 0 20px 0;">
                  {{token}}
                </p>
                <p style="color: #444; font-size: 14px; font-weight: bold; margin-bottom: 10px;">
                  Este código expira em 24 horas.
                </p>
                <p style="color: #777; font-size: 14px; margin: 0;">
                  Caso seja necessário, solicite um novo código de acesso.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
                © {{year}} Converge Que Cola. Todos os direitos reservados.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
`,
        });
    }
};
exports.CustomMailService = CustomMailService;
exports.CustomMailService = CustomMailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], CustomMailService);
//# sourceMappingURL=mail.service.js.map