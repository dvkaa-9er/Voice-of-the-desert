import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents other sites from embedding this page in an <iframe> (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },

  // Stops browsers from guessing the MIME type of a response (MIME sniffing attacks)
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Only send origin (not full URL) as referrer when navigating to external sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Disable browser APIs this site doesn't use — prevents silent abuse by any future third-party script
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },

  // Tell browsers to always use HTTPS for this domain for 2 years (SSL-strip protection)
  // Note: only effective once deployed behind HTTPS (Vercel). Safe to have in code now.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },

  // Content Security Policy — declares what origins can load scripts, styles, media, etc.
  //
  // Limitations to be aware of:
  //   - 'unsafe-inline' in script-src is required by Next.js hydration scripts.
  //     This weakens XSS protection for inline scripts specifically, but all OTHER
  //     directives still apply. Removing it requires a nonce-based setup (future task).
  //   - 'unsafe-inline' in style-src is required by Tailwind and Framer Motion,
  //     which inject styles at runtime.
  //   - img-src includes blob: and data: because Three.js/R3F use them for textures.
  //   - worker-src includes blob: for the same reason.
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "font-src 'self'",
      "connect-src 'self'",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Suppress the X-Powered-By: Next.js header — no reason to advertise the framework
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',  // applies to every route, including /shop
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
