import rateLimit from 'express-rate-limit';

export function createRateLimiter() {
  const windowMinutes = parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '1', 10);
  const maxPerWindow = parseInt(process.env.RATE_LIMIT_MAX || '30', 10);

  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxPerWindow,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: { code: 'RATE_LIMIT', message: 'Too many requests, slow down.' } }
  });
}