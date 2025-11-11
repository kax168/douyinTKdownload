import axios from 'axios';

interface ParseResult {
  title: string;
  author: string;
  cover: string;
  durationSeconds: number;
  qualities: { quality: string; sizeEstimateBytes?: number }[];
  platform: string;
  originalUrl: string;
}

const tikTokBase = process.env.BACKEND_BASE_URL_TIKTOK || 'http://backend-tiktok:8080';

function detectPlatform(url: string): string {
  if (/tiktok\.com/i.test(url)) return 'tiktok';
  if (/douyin\.com/i.test(url)) return 'douyin';
  if (/xiaohongshu\.com|xhslink\.com/i.test(url)) return 'xhs';
  return 'unknown';
}

export async function parseUrl(url: string): Promise<ParseResult> {
  const platform = detectPlatform(url);
  switch (platform) {
    case 'tiktok': {
      const resp = await axios.post(`${tikTokBase}/parse`, { url });
      return resp.data;
    }
    default:
      throw new Error('Unsupported platform');
  }
}

export async function resolveDownload(originalUrl: string, quality?: string): Promise<{ downloadUrl: string }> {
  const platform = detectPlatform(originalUrl);
  switch (platform) {
    case 'tiktok': {
      const resp = await axios.post(`${tikTokBase}/resolve`, { url: originalUrl, quality });
      return resp.data;
    }
    default:
      throw new Error('Unsupported platform');
  }
}