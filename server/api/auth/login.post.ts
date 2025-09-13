import { z } from "zod";

const bodySchema = z.object({
  email: z.email(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.email, email),
  });

  const isValid =
    user &&
    user.passwordHash &&
    (await verifyPassword(user.passwordHash, password));

  if (isValid) {
    await setUserSession(event, {
      user: {
        email: email,
        name: user.name,
        admin: user.admin,
      },
    });
    return;
  }
  throw createError({
    statusCode: 401,
    message: "Bad credentials",
  });
});
