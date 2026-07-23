export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden mesh-bg">
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[oklch(0.7_0.22_275/0.28)] blur-3xl animate-drift" />
      <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-[oklch(0.75_0.18_200/0.22)] blur-3xl animate-drift" style={{ animationDelay: "-6s" }} />
      <div className="absolute -bottom-40 left-1/3 h-[520px] w-[520px] rounded-full bg-[oklch(0.78_0.18_320/0.22)] blur-3xl animate-drift" style={{ animationDelay: "-12s" }} />
      <svg className="absolute inset-0 h-full w-full opacity-[0.035]">
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>
    </div>
  );
}
