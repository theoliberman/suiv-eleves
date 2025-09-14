export default async function (payload: Object) {
  if (import.meta.dev) {
    const jwt = await import("jsonwebtoken");
    return jwt.default.sign(payload, useRuntimeConfig().JWT_SECRET);
  } else {
    const jwt = await import("@tsndr/cloudflare-worker-jwt");
    return await jwt.default.sign(payload, useRuntimeConfig().JWT_SECRET);
  }
}
