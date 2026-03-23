import nodemailer from 'nodemailer';
import { env } from '../config/environment';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.smtp.host,
            port: env.smtp.port,
            secure: env.smtp.port === 465, // true for 465, false for other ports
            auth: env.smtp.user ? {
                user: env.smtp.user,
                pass: env.smtp.pass,
            } : undefined, // If no user provided, assume local/unauthenticated SMTP or just ignore auth
        });
    }

    async sendPasswordResetEmail(to: string, resetUrl: string) {
        if (!env.smtp.host) {
            console.log('\n==================================================');
            console.log('NO SMTP CONFIGURATION FOUND. SIMULATING EMAIL SENT:');
            console.log(`To: ${to}`);
            console.log(`Reset URL: ${resetUrl}`);
            console.log('==================================================\n');
            return;
        }

        const mailOptions = {
            from: `"Equipo Slow Pozoblanco" <${env.smtp.from}>`,
            to,
            subject: 'Recuperación de contraseña - Slow Pozoblanco',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Recuperación de contraseña</h2>
                    <p>Hola,</p>
                    <p>Has solicitado restablecer tu contraseña para tu cuenta en Slow Pozoblanco. Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                    <p style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #004fb0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Restablecer mi contraseña</a>
                    </p>
                    <p>Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:</p>
                    <p><a href="${resetUrl}">${resetUrl}</a></p>
                    <p style="color: #666; font-size: 14px;">Este enlace expirará en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
                </div>
            `,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
        } catch (error: any) {
            console.error('Error sending email exact:', error.message);
            throw new Error(`Detalle técnico: ${error.message || 'Desconocido'}`);
        }
    }
}
