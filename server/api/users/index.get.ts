export default defineEventHandler(async (event) => {
  const {
    user: { email },
  } = await requireUserSession(event);

  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.email, email),
  });

  if (!user?.admin) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  return await useDrizzle().query.users.findMany({
    columns: {
      passwordHash: false,
    },
  });
});
