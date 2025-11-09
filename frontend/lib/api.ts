import axios from 'axios';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
const BASE = process.env.NEXT_PUBLIC_GATEWAY_BASE_URL || '';
const client = axios.create({ baseURL: BASE });
export async function parseUrl(url: string) { const resp = await client.post('/api/parse', { url }, { headers: { 'x-api-key': API_KEY } }); return resp.data; }
export async function downloadVideo(url: string, quality: string) { const resp = await client.post('/api/download', { url, quality }, { headers: { 'x-api-key': API_KEY } }); return resp.data; }