export default defineNuxtRouteMiddleware(async (route) => {
  const { user } = useUserSession();

  if (route.fullPath.startsWith("/admin") && !user.value?.admin) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page not found: ${route.fullPath}`,
    });
  }
});
