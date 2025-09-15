import { getTableColumns } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  await requireAdminUserSession(event);

  const { id } = getRouterParams(event);

  const { passwordHash, ...rest } = getTableColumns(tables.users);

  const user = await useDrizzle()
    .delete(tables.users)
    .where(and(eq(tables.users.id, Number(id)), eq(tables.users.admin, false)))
    .returning({ ...rest })
    .get();

  if (!user) throw createError({ statusCode: 401, message: "Unauthorized" });

  return user;
});
