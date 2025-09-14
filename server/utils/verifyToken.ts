export default async function (token: string) {
  if (import.meta.dev) {
    const jwt = await import("jsonwebtoken");
    return jwt.default.verify(token, useRuntimeConfig().JWT_SECRET) as any;
  } else {
    const jwt = await import("@tsndr/cloudflare-worker-jwt");
    return (await jwt.default.verify(token, useRuntimeConfig().JWT_SECRET))
      ?.payload as any;
  }
}
