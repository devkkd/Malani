/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Typo redirects: /techniquess → /techniques
      {
        source: '/techniquess',
        destination: '/techniques',
        permanent: true,
      },
      {
        source: '/techniquess/:path*',
        destination: '/techniques/:path*',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/collection',
        permanent: true,
      },
      {
        source: '/products/:path*',
        destination: '/collection',
        permanent: true,
      },
      {
        source: '/techniques/chikan-comp',
        destination: '/techniques/chikan-embroidery',
        permanent: true,
      },
      {
        source: '/techniques/machine',
        destination: '/techniques/machine-embroidery',
        permanent: true,
      },
      {
        source: '/collection/classics',
        destination: '/collection',
        permanent: true,
      },
      {
        source: '/collection/summer',
        destination: '/collection',
        permanent: true,
      },
      {
        source: '/empowerment/impact',
        destination: '/empowerment',
        permanent: true,
      },
      // Old blog URLs → new category/language/slug structure
      {
        source: '/blog/:slug',
        destination: '/blog/general/english/:slug',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Prevent search engines from indexing font files and static assets as web pages
        source: '/_next/static/media/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
  // Silence the "webpack config but no turbopack config" warning
  // root points Turbopack to this frontend directory, avoiding the lockfile warning
  turbopack: {
    root: process.cwd(),
  },

  // compiler options
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
};

export default nextConfig;
