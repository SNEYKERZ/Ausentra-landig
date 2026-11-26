import type { ReactNode } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckCheck,
  FileText,
  Home,
  Users,
  Clock3,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo";

export type ModuleKey =
  | "inicio"
  | "calendario"
  | "comunidad"
  | "aprobaciones"
  | "horas"
  | "documentos"
  | "reportes";

const MODULES: { key: ModuleKey; label: string; icon: typeof Home }[] = [
  { key: "inicio", label: "Inicio", icon: Home },
  { key: "calendario", label: "Calendario", icon: CalendarDays },
  { key: "comunidad", label: "Comunidad", icon: Users },
  { key: "aprobaciones", label: "Aprobaciones", icon: CheckCheck },
  { key: "horas", label: "Horas extra", icon: Clock3 },
  { key: "documentos", label: "Documentos", icon: FileText },
  { key: "reportes", label: "Reportes", icon: BarChart3 },
];

/** Ventana de la app con barra lateral, fiel al panel de Ausentra. */
export function AppFrame({
  active,
  title,
  subtitle,
  actions,
  pending = 2,
  sidebar = true,
  className,
  children,
}: {
  active: ModuleKey;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  pending?: number;
  sidebar?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-white text-left text-ink shadow-[0_1px_2px_oklch(0.3_0.05_274/0.06),0_24px_48px_-16px_oklch(0.3_0.08_274/0.22)] ring-1 ring-ink/8",
        className,
      )}
      role="img"
      aria-label={`Vista de ejemplo del módulo ${title} de Ausentra`}
    >
      <div className="flex">
        {sidebar && (
          <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-line bg-canvas p-3 lg:flex">
            <div className="mb-3 flex items-center gap-2 px-2 pt-1">
              <LogoMark className="h-6 w-6 text-brand-600" />
              <span className="text-sm font-semibold">Ausentra</span>
            </div>
            <div className="mb-2 flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-xs text-ink-mute ring-1 ring-line">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              Buscar
            </div>
            {MODULES.map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[0.8125rem]",
                  key === active
                    ? "bg-brand-100 font-medium text-brand-800"
                    : "text-ink-soft",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="flex-1">{label}</span>
                {key === "aprobaciones" && pending > 0 && (
                  <span className="tabular rounded-full bg-brand-600 px-1.5 text-[0.6875rem] font-semibold leading-[1.125rem] text-white">
                    {pending}
                  </span>
                )}
              </div>
            ))}
          </aside>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="text-[0.9375rem] font-semibold tracking-[-0.01em]">{title}</p>
              {subtitle && <p className="truncate text-xs text-ink-mute">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
  const hues = [274, 160, 60, 15, 235, 320];
  const hue = hues[name.length % hues.length];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-semibold",
        className,
      )}
      style={{
        background: `oklch(0.93 0.04 ${hue})`,
        color: `oklch(0.38 0.1 ${hue})`,
      }}
    >
      {initials}
    </span>
  );
}

type Tone = "ok" | "wait" | "no" | "neutral" | "brand";

const TONES: Record<Tone, string> = {
  ok: "bg-ok-soft text-ok",
  wait: "bg-wait-soft text-wait",
  no: "bg-no-soft text-no",
  neutral: "bg-paper text-ink-soft",
  brand: "bg-brand-100 text-brand-700",
};

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[0.6875rem] font-medium",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}

export function FakeButton({
  children,
  primary,
  className,
}: {
  children: ReactNode;
  primary?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium",
        primary ? "bg-brand-600 text-white" : "bg-white text-ink ring-1 ring-line",
        className,
      )}
    >
      {children}
    </span>
  );
}
