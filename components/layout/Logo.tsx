export default function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 rounded-xl bg-linear-to-br from-[#F59E0B] via-[#FFB347] to-[#F97316] blur-[6px] opacity-70" />
        <svg
          viewBox="0 0 48 48"
          className="relative z-10 w-9 h-9"
          fill="none"
          stroke="currentColor"
        >
          <rect
            x="6"
            y="6"
            width="36"
            height="36"
            rx="10"
            className="text-[#0A0D12]"
            fill="currentColor"
            fillOpacity="0.9"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M16 30c6 0 6-12 12-12h4"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 18h4c6 0 6 12 12 12"
            stroke="#FDBA74"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="18" r="2.6" fill="#F59E0B" />
          <circle cx="32" cy="30" r="2.6" fill="#FDBA74" />
        </svg>
      </div>

      <div>
        <div className="text-lg font-semibold tracking-tight">ForgeFit</div>
        <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">
          Strength Systems
        </div>
      </div>
    </div>
  );
}
