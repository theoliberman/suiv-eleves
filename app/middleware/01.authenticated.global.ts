export default defineNuxtRouteMiddleware(async (route) => {
  const { loggedIn, fetch: refreshSession } = useUserSession();

  await refreshSession();

  if (route.fullPath.includes("/auth")) {
    return;
  }

  if (!loggedIn.value) return navigateTo("/auth/login");
});
