/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration (Next.js 16+)
  turbopack: {
    // Empty config to silence the warning
    // Turbopack will use default settings
  },
  
  // Memory optimization
  experimental: {
    // Reduce memory usage during build
    workerThreads: false,
    cpus: 1,
  },
  
  // Output optimization
  output: 'standalone',
  
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-6dd73db7c8484493aebab692a14f1dbf.r2.dev',
        pathname: '/**',
      },
    ],
    qualities: [75, 85, 90],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Webpack optimization
  webpack: (config, { isServer }) => {
    // Reduce memory usage
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    };
    
    return config;
  },
};

export default nextConfig;
