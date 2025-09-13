export default async function (
  email: string,
  subject: string,
  content: string,
) {
  const config = useRuntimeConfig().nodemailer;

  if (import.meta.dev) {
    const { sendMail } = useNodeMailer();
    return await sendMail({
      to: email,
      subject: subject,
      text: content,
    });
  } else {
    const { WorkerMailer } = await import("worker-mailer");
    return await WorkerMailer.send(
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
        subject: "Hello",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      },
    );
  }
}
