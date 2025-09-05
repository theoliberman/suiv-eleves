const invalidCredentialsError = createError({
  statusCode: 401,
  // This message is intentionally vague to prevent user enumeration attacks.
  message: "Invalid credentials",
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.email, email),
  });

  if (!user || !user.passwordHash) {
    throw invalidCredentialsError;
  }

  if (!(await verifyPassword(user.passwordHash, password))) {
    throw invalidCredentialsError;
  }

  await setUserSession(event, {
    user: {
      email: user.email,
      name: user.name,
    },
  });

  return setResponseStatus(event, 201);
});
