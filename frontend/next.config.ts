import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // We don't need rewrites for Vercel -> External Backend
  // Instead, the frontend code should use the full URL from NEXT_PUBLIC_API_URL
};

export default withNextIntl(nextConfig);
