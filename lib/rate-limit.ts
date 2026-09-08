// Simple in-memory rate limiter for server actions
// NOTE: For a multi-region Vercel deployment, use Vercel KV or Upstash Redis instead.

const rateLimits = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(identifier: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now();
  const userLimit = rateLimits.get(identifier);

  if (!userLimit) {
    rateLimits.set(identifier, { count: 1, lastReset: now });
    return { success: true };
  }

  // Reset window if it has passed
  if (now - userLimit.lastReset > windowMs) {
    rateLimits.set(identifier, { count: 1, lastReset: now });
    return { success: true };
  }

  if (userLimit.count >= limit) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  userLimit.count += 1;
  return { success: true };
}
