export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...");
    await useDrizzle()
      .insert(tables.users)
      .values({
        email: "admin@mail.com",
        passwordHash: await hashPassword("admin"),
      });
    return { result: "success" };
  },
});
