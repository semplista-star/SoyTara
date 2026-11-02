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
    // Rutas retiradas (Documento único web, 29-oct-2026, tanda 1): la web
    // antigua de centros, el panel docente sin login real y documentos
    // antiguos dejan de publicarse y redirigen de forma permanente.
    const retired = [
      ["/escoles", "/#pilotaje"],
      ["/escoles/:path*", "/#pilotaje"],
      ["/soytara_mestres", "/"],
      ["/soytara_mestres.html", "/"],
      ["/tara-dashboard-tutora", "/"],
      ["/tara-dashboard-tutora.html", "/"],
      ["/tara-presentacio-subvencions-2026.pdf", "/"],
      ["/tara-home.html", "/"],
      ["/privacidad.html", "/privacidad"]
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
    return [...wwwRedirects, ...retired];
  },
  async rewrites() {
    // La portada y las páginas legales las sirve el middleware según el
    // dominio (public/_site/{es,ca,en}). El chat vive en /chat.
    return [{ source: "/chat", destination: "/index.html" }];
  },
  async headers() {
    return [
      { source: "/_site/:name.js", headers: [{ key: "cache-control", value: "public, max-age=31536000, immutable" }] },
      { source: "/fonts/:file*", headers: [{ key: "cache-control", value: "public, max-age=31536000, immutable" }] }
    ];
  }
};

export default nextConfig;
