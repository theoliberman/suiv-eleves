import { getTableColumns } from "drizzle-orm";

export default defineTask({
  meta: {
    name: "admin",
    description: "Add admin user",
  },
  async run() {
    const user = {
      email: "admin@mail.com",
      passwordHash: await hashPassword("admin"),
      admin: true,
    };

    const { passwordHash, ...rest } = getTableColumns(tables.users);

    const res = await useDrizzle()
      .insert(tables.users)
      .values(user)
      .onConflictDoUpdate({
        target: tables.users.email,
        set: { passwordHash: user.passwordHash, admin: user.admin },
      })
      .returning({ ...rest })
      .get();

    return {
      result: res,
    };
  },
});
