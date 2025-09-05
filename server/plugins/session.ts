export default defineNitroPlugin(() => {
  // Called when the session is fetched during SSR for the Vue composable (/api/_auth/session)
  // Or when we call useUserSession().fetch()
  sessionHooks.hook("fetch", async (session, event) => {
    // extend User Session by calling your database
    // or
    // throw createError({ ... }) if session is invalid for example

    if (session.user) {
      const user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.email, session.user.email),
      });
      if (!user) {
        await clearUserSession(event);
        throw createError({
          statusCode: 401,
          message: "Invalid token",
        });
      } else {
        session.user = {
          email: user.email,
          name: user.name,
          admin: user.admin,
        };
      }
    }
  });

  // Called when we call useUserSession().clear() or clearUserSession(event)
  sessionHooks.hook("clear", async (session, event) => {
    // Log that user logged out
  });
});
