export const metadata = {
  title: '抖音/TikTok/小红书 无水印下载器',
  description: '仅用于个人学习/备份，遵守平台条款与版权法律'
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">抖音 / TikTok / 小红书 无水印视频下载器</h1>
          {children}
          <footer className="mt-10 text-xs text-neutral-400 space-y-2">
            <p>免责声明：本工具仅供个人学习与备份用途……用户行为自行负责。</p>
            <p>若解析或下载失败，可能为 Cookie 过期 / 限流。</p>
          </footer>
        </div>
      </body>
    </html>
  );
}