/** @type {import('next').NextConfig} */

// GitHub Pages serves project sites from /<repo-name>/, so every asset path
// needs that prefix in production. Set NEXT_PUBLIC_BASE_PATH in the GitHub
// Actions workflow (see .github/workflows/deploy.yml) to your repo name,
// e.g. "/sach2027". Leave unset for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true, // GitHub Pages has no image optimization server
  },
  trailingSlash: true, // avoids GitHub Pages 404s on nested routes
};

export default nextConfig;
