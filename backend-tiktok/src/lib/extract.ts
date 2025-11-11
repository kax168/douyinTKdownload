// 伪解析逻辑：真实环境需抓包/逆向/调用平台 API
import axios from 'axios';

export interface ParsedResult {
  title: string;
  author: string;
  cover: string;
  durationSeconds: number;
  qualities: { quality: string; sizeEstimateBytes?: number }[];
  platform: string;
  originalUrl: string;
}

export async function parseTikTokUrl(url: string): Promise<ParsedResult> {
  // TODO: 替换为真实实现
  // const html = await axios.get(url, { headers: {...} });
  // const meta = extractMeta(html.data);
  return {
    title: '示例 TikTok 视频标题',
    author: '示例作者',
    cover: 'https://dummyimage.com/480x270/0f0f17/ffffff&text=TikTok+Cover',
    durationSeconds: 17,
    qualities: [{ quality: '480p' }, { quality: '720p' }, { quality: '1080p' }],
    platform: 'tiktok',
    originalUrl: url
  };
}

export async function resolveDownloadUrl(originalUrl: string, quality?: string): Promise<string> {
  // 真实实现：根据 quality 获取无水印直链
  // return realUrl;
  return 'https://example.com/video/no-watermark-demo.mp4';
}
