import nodemailer from "nodemailer";

type InquiryNotification = {
  name: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  teamSize: string;
  message: string;
};

export async function sendInquiryNotification(inquiry: InquiryNotification) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;
  const to = process.env.ADMIN_EMAIL;
  const security = process.env.SMTP_SECURE?.trim().toLowerCase();

  const secure =
    security === undefined || security === ""
      ? port === 465
      : ["true", "ssl", "tls"].includes(security)
        ? true
        : ["false", "starttls", "none"].includes(security)
          ? false
          : undefined;

  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535 ||
    !user ||
    !password ||
    !from ||
    !to ||
    secure === undefined
  ) {
    throw new Error(
      "Configure valid SMTP_HOST, SMTP_PORT, SMTP_SECURE (SSL/TLS or STARTTLS), SMTP_USER, SMTP_PASSWORD, SMTP_FROM, and ADMIN_EMAIL values.",
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: inquiry.email,
    subject: "New workspace inquiry",
    text: [
      "A new workspace inquiry was submitted.",
      "",
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      `City: ${inquiry.city}`,
      `Service: ${inquiry.service}`,
      `Team size: ${inquiry.teamSize}`,
      "",
      "Message:",
      inquiry.message || "(No additional message)",
    ].join("\n"),
  });
}
