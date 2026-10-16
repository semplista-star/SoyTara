/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const wwwHosts = ["www.soytara.com", "www.soctara.com", "www.iamtara.io"];
    return wwwHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `https://${host.replace("www.", "")}/:path*`,
      permanent: true
    }));
  },
  async rewrites() {
    return [
      // "/" sirve la portada estática nueva (public/tara-home.html).
      // En soctara.com/iamtara.io, el middleware la intercepta antes de
      // llegar aquí y sirve la misma plantilla con lang/title/og:* del
      // idioma correspondiente. La app de chat existente (index.html,
      // sin tocar) vive en /chat.
      { source: "/", destination: "/tara-home.html" },
      { source: "/chat", destination: "/index.html" },
      { source: "/escoles", destination: "/escoles/index.html" },
      { source: "/escoles/", destination: "/escoles/index.html" },
      { source: "/soytara_mestres", destination: "/soytara_mestres.html" },
      { source: "/tara-dashboard-tutora", destination: "/tara-dashboard-tutora.html" }
    ];
  }
};

export default nextConfig;
