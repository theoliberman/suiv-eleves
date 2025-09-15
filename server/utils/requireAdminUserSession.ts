import { H3Event, EventHandlerRequest } from "h3";

export default async function (event: H3Event<EventHandlerRequest>) {
  const userSession = await requireUserSession(event);

  const isAdmin = await useDrizzle().query.users.findFirst({
    where: and(
      eq(tables.users.email, userSession.user.email),
      eq(tables.users.admin, true),
    ),
  });

  if (!isAdmin) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  return userSession;
}
