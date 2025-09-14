import { z } from "zod";

const bodySchema = z.object({
  email: z.email(),
});

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, bodySchema.parse);

  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.email, email),
  });

  if (!user) return;

  const token = await getToken({ email: user.email });
  const hash = await hashPassword(token);

  await useDrizzle()
    .insert(tables.tokens)
    .values({ email: user.email, hash: hash })
    .onConflictDoUpdate({
      target: tables.tokens.email,
      set: { hash: hash },
    });

  const url = `${getRequestURL(event).origin}/auth/reset-password?token=${token}`;

  await sendMail(user.email, "Réinitialisation de votre mot de passe", url);
});
