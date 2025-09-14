import { z } from "zod";

const bodySchema = z
  .object({
    password: z.string(),
    confirm: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirm);

export default defineEventHandler(async (event) => {
  const { password, token } = await readValidatedBody(event, bodySchema.parse);

  const { email } = await verifyToken(token);

  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.email, email),
  });

  if (!user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const passwordResetToken = await useDrizzle().query.tokens.findFirst({
    where: eq(tables.tokens.email, user.email),
  });

  if (!passwordResetToken) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  if (!(await verifyPassword(passwordResetToken.hash, token))) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  await useDrizzle()
    .update(tables.users)
    .set({ passwordHash: await hashPassword(password) })
    .where(eq(tables.users.email, email));

  await useDrizzle()
    .delete(tables.tokens)
    .where(eq(tables.tokens.email, user.email));
});
