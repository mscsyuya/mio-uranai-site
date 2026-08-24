/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的書き出し。Vercel でも `out/` をそのまま配信できる
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
