import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8 shrink-0", className)}
    >
      <rect x="2" y="5" width="28" height="25" rx="7" fill="currentColor" />
      <rect x="8.5" y="2" width="3.5" height="7" rx="1.75" className="fill-brand-900" />
      <rect x="20" y="2" width="3.5" height="7" rx="1.75" className="fill-brand-900" />
      <path
        d="M10 18.5l4.2 4.2L22.5 14"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <a
      href="/"
      className={cn("inline-flex items-center gap-2.5 rounded-md", className)}
      aria-label={`${BRAND.name}, inicio`}
    >
      <LogoMark className={tone === "light" ? "text-brand-400" : "text-brand-600"} />
      <span
        className={cn(
          "text-[1.0625rem] font-semibold tracking-[-0.02em]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {BRAND.name}
      </span>
    </a>
  );
}
