import { SITE } from "@/lib/site";

/** One swept ceiling-fan blade pointing up from the centre (50,50); the mark repeats it at 120° steps. */
const BLADE = "M45 38 C38 28 36 14 43 6 C50 0 61 3 62 12 C63 22 58 31 55 38 Z";

/**
 * The GGMW mark: a ceiling fan seen from below, three steel blades around an orange motor hub stamped GGMW.
 * The blades spin on hover (`.fan-blades`, off under reduced motion). Browser-tab version: app/icon.svg.
 */
export function LogoMark({ className = "size-13 sm:size-14", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <g className={`fan-blades ${light ? "fill-[#cfd5db]" : "fill-brand"}`}>
        {[0, 120, 240].map((deg) => <path key={deg} d={BLADE} transform={`rotate(${deg} 50 50)`} />)}
      </g>
      <circle cx="50" cy="50" r="26" className="fill-accent" />
      <circle cx="50" cy="50" r="22.5" fill="none" stroke="white" strokeOpacity=".45" strokeWidth="1" />
      <text x="50" y="55" textAnchor="middle" fill="white" fontFamily="var(--ff-display), Arial, sans-serif" fontWeight="900"
            fontSize="13.5" textLength="38" lengthAdjust="spacingAndGlyphs">GGMW</text>
    </svg>
  );
}

/** Mark + wordmark. `light` for dark backgrounds. */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="group/logo flex items-center gap-2.5">
      <LogoMark light={light} />
      <span className="leading-none">
        <span className={`block font-display text-lg font-extrabold tracking-tight uppercase sm:text-xl ${light ? "text-white" : "text-ink"}`}>
          {SITE.name}
        </span>
        <span className={`tag mt-1 block text-[10px]! ${light ? "text-white/50" : "text-slate-500"}`}>
          {SITE.shortName} · Est. {SITE.founded}
        </span>
      </span>
    </span>
  );
}
