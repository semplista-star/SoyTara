"use client";

/**
 * Visual signature for the two public "spheres" — a soft radial presence,
 * not a literal 3D object. CSS-only breathing animation (no WebGL/Three.js:
 * unjustified weight for a static accent). "active" reads warm and alive
 * (Esfera A); "dormant" reads muted and still, signalling "not yet open"
 * (Esfera B) without needing a text badge to carry the whole meaning.
 */
export default function SphereOrb({ variant }: { variant: "active" | "dormant" }) {
  return (
    <div className={`sphere-orb sphere-orb-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" width="40" height="40">
        <circle cx="32" cy="32" r="30" className="sphere-orb-ring" />
        <circle cx="32" cy="32" r="14" className="sphere-orb-core" />
      </svg>
    </div>
  );
}
