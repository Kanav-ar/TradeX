import nodemailer from "nodemailer";
import { welcomeEmailTemplate } from "../../templates/welcome-email";
import { verificationEmailTemplate } from "../../templates/verification-email";
import { forgotPasswordEmailTemplate } from "../../templates/forgot-password-email";
import type { EmailTemplateProps } from "../../types/emailTemplateTypes";

interface SendEmailProps {
  email: string;
  username: string;
  verificationUrl: string;
  subject: string;
  emailType: "welcome" | "verify" | "forgotPassword";
}

interface EmailTemplateTypes {
  welcome: ({ username, verificationUrl }: EmailTemplateProps) => string;
  verify: ({ username, verificationUrl }: EmailTemplateProps) => string;
  forgotPassword: ({ username, verificationUrl }: EmailTemplateProps) => string;
}

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpUser || !smtpPass) {
  throw new Error("SMTP_USER or SMTP_PASS is not defined");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const emailTemplates: EmailTemplateTypes = {
  welcome: welcomeEmailTemplate,
  verify: verificationEmailTemplate,
  forgotPassword: forgotPasswordEmailTemplate,
};

export const sendEmail = async ({
  email,
  username,
  verificationUrl,
  subject,
  emailType,
}: SendEmailProps) => {
  const html = emailTemplates[emailType]({
    username,
    verificationUrl,
  });

  const info = await transporter.sendMail({
    from: `"TradeX" <${smtpUser}>`,
    to: email,
    subject,
    html,
  });

  return {
    messageId: info.messageId,
  };
};