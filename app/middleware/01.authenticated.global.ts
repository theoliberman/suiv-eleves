export default defineNuxtRouteMiddleware(async (route) => {
  const { loggedIn, fetch } = useUserSession();

  await fetch();

  if (route.fullPath === "/login") return;

  if (!loggedIn.value) return navigateTo("/login");
});
