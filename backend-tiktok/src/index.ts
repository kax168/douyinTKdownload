import express from 'express';
import { parseTikTokUrl, resolveDownloadUrl } from './lib/extract.js';

const app = express();
app.use(express.json());

app.post('/parse', async (req, res) => {
  const { url } = req.body || {};
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'url required' } });
  }
  try {
    const data = await parseTikTokUrl(url);
    res.json(data);
  } catch (e) {
    const err = e as Error;
    res.status(500).json({ error: { code: 'PARSE_FAILED', message: err?.message || 'parse error' } });
  }
});

app.post('/resolve', async (req, res) => {
  const { url, quality } = req.body || {};
  if (!url) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'url required' } });
  try {
    const downloadUrl = await resolveDownloadUrl(url, quality);
    res.json({ downloadUrl });
  } catch (e) {
    const err = e as Error;
    res.status(500).json({ error: { code: 'RESOLVE_FAILED', message: err?.message || 'resolve error' } });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', platform: 'tiktok' });
});

const port = process.env.TIKTOK_BACKEND_PORT || 8080;
app.listen(port, () => console.log(`backend-tiktok running on ${port}`));
