/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/escoles", destination: "/escoles/index.html" },
      { source: "/escoles/", destination: "/escoles/index.html" },
      { source: "/soytara_mestres", destination: "/soytara_mestres.html" },
      { source: "/tara-dashboard-tutora", destination: "/tara-dashboard-tutora.html" }
    ];
  }
};

export default nextConfig;
