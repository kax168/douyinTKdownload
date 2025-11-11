import { Request, Response, NextFunction } from 'express';

export function apiKeyGuard(req: Request, res: Response, next: NextFunction) {
  const clientKey = req.header('x-api-key');
  const serverKey = process.env.API_KEY;
  if (!serverKey) {
    return res.status(500).json({ error: { code: 'CONFIG_ERROR', message: 'API_KEY not set on server' } });
  }
  if (!clientKey || clientKey !== serverKey) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or missing API key' } });
  }
  next();
}