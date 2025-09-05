export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, fetch } = useUserSession();

  await fetch();

  if (to.fullPath === "/login") return;

  if (!loggedIn.value) return navigateTo("/login");
});
