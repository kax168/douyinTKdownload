'use client';
import { useEffect, useState } from 'react';
import { parseUrl, downloadVideo } from '../lib/api';
import dayjs from 'dayjs';
interface Meta { title: string; author: string; cover: string; durationSeconds: number; qualities: { quality: string; bitrate?: number; sizeEstimateBytes?: number }[]; originalUrl?: string; platform?: string; }
export default function DownloadForm() {
  const [input, setInput] = useState('');
  const [meta, setMeta] = useState<Meta | null>(null);
  const [quality, setQuality] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => { const h = localStorage.getItem('downloadHistory'); if (h) setHistory(JSON.parse(h)); }, []);
  function pushHistory(item: any) { const newHist = [item, ...history].slice(0, 5); setHistory(newHist); localStorage.setItem('downloadHistory', JSON.stringify(newHist)); }
  async function handleParse() { setErr(''); setMeta(null); setDownloadUrl(''); setLoading(true); try { const data = await parseUrl(input); setMeta(data); if (data.qualities?.length) setQuality(data.qualities[0].quality); } catch (e: any) { setErr(e.response?.data?.error || '解析失败'); } finally { setLoading(false); } }
  async function handleDownload() { if (!meta) return; setErr(''); setLoading(true); try { const data = await downloadVideo(meta.originalUrl || input, quality); setDownloadUrl(data.downloadUrl); pushHistory({ title: meta.title, time: dayjs().format('HH:mm:ss'), quality, url: data.downloadUrl, platform: meta.platform }); } catch (e: any) { setErr(e.response?.data?.error || '下载失败'); } finally { setLoading(false); } }
  return (<div>前端示例表单 (精简版)</div>);
}