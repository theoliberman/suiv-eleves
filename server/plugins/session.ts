export default defineNitroPlugin(() => {
  // Called when the session is fetched during SSR for the Vue composable (/api/_auth/session)
  // Or when we call useUserSession().fetch()
  sessionHooks.hook("fetch", async (session, event) => {
    // extend User Session by calling your database
    // or
    // throw createError({ ... }) if session is invalid for example
    const { user: sessionUser } = await getUserSession(event);
    if (sessionUser) {
      const user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.email, sessionUser.email),
      });
      if (!user || !user.passwordHash) {
        await clearUserSession(event);
        throw createError({
          statusCode: 401,
          message: "Invalid session",
        });
      }
      session.user = {
        email: user.email,
        name: user.name,
        admin: user.admin,
      };
    }
  });
});
