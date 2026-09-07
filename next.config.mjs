/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // "/" ahora la sirve la landing en React (app/page.tsx).
      // La app de chat existente (index.html, sin tocar) vive en /chat.
      { source: "/chat", destination: "/index.html" },
      { source: "/escoles", destination: "/escoles/index.html" },
      { source: "/escoles/", destination: "/escoles/index.html" },
      { source: "/soytara_mestres", destination: "/soytara_mestres.html" },
      { source: "/tara-dashboard-tutora", destination: "/tara-dashboard-tutora.html" }
    ];
  }
};

export default nextConfig;
