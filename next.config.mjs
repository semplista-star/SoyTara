/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const wwwHosts = ["www.soytara.com", "www.soctara.com", "www.iamtara.io"];
    const wwwRedirects = wwwHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `https://${host.replace("www.", "")}/:path*`,
      permanent: true
    }));
    // /escoles se retira (Revisión WEB TARA, oct. 2026): pasa a redirigir
    // de forma permanente a la sección de centros e instituciones de la home.
    const escolesRedirects = [
      { source: "/escoles", destination: "/#comunidad", permanent: true },
      { source: "/escoles/:path*", destination: "/#comunidad", permanent: true }
    ];
    return [...wwwRedirects, ...escolesRedirects];
  },
  async rewrites() {
    return [
      // "/" sirve la portada estática nueva (public/tara-home.html).
      // En soctara.com/iamtara.io, el middleware la intercepta antes de
      // llegar aquí y sirve la misma plantilla con lang/title/og:* del
      // idioma correspondiente. La app de chat existente (index.html,
      // sin tocar) vive en /chat.
      { source: "/", destination: "/tara-home.html" },
      { source: "/privacidad", destination: "/privacidad.html" },
      { source: "/chat", destination: "/index.html" },
      { source: "/soytara_mestres", destination: "/soytara_mestres.html" },
      { source: "/tara-dashboard-tutora", destination: "/tara-dashboard-tutora.html" }
    ];
  }
};

export default nextConfig;
