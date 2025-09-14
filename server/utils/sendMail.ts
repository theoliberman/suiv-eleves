export default async function (
  email: string,
  subject: string,
  content: string,
) {
  const config = useRuntimeConfig().mailer;

  if (import.meta.dev) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      //@ts-ignore
      host: config.host,
      port: config.port,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
    await transporter.sendMail({
      from: '"SuivEleves" <noreply@suiv-eleves.app>',
      to: email,
      subject: subject,
      text: content,
    });
  } else {
    const { WorkerMailer } = await import("worker-mailer");
    await WorkerMailer.send(
      {
        host: config.host,
        port: Number(config.port),
        credentials: {
          username: config.auth.user,
          password: config.auth.pass,
        },
        authType: "plain",
        secure: true,
      },
      {
        from: { name: "SuivEleves", email: "noreply@suiv-eleves.app" },
        to: email,
        subject: subject,
        text: content,
      },
    );
  }
}
