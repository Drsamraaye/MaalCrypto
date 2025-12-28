import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    if (!process.env.EMAIL_SERVER_USER) {
        console.log('Mock Email Sent:', { to, subject });
        return;
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"MaalCrypto" <noreply@maalcrypto.com>',
            to,
            subject,
            html,
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        // Don't throw error to prevent blocking the main flow, just log it
    }
}
