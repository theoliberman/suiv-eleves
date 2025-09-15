import { z } from "zod";
import { getTableColumns } from "drizzle-orm";

const bodySchema = z.object({
  email: z.email(),
});

export default defineEventHandler(async (event) => {
  await requireAdminUserSession(event);

  const { email } = await readValidatedBody(event, bodySchema.parse);

  const { passwordHash, ...rest } = getTableColumns(tables.users);

  const user = await useDrizzle()
    .insert(tables.users)
    .values({ email })
    .returning({ ...rest })
    .get();

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

  await sendMail(user.email, "Activation de votre compte SuivEleves", url);

  return user;
});
