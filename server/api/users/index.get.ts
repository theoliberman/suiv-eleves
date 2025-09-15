import { getTableColumns } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  await requireAdminUserSession(event);

  const { passwordHash, ...rest } = getTableColumns(tables.users);

  return await useDrizzle()
    .select({
      ...rest,
      activated: sql<boolean>`length(${tables.users.passwordHash}) > 0`,
    })
    .from(tables.users);
});
