import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Filter, MousePointer2, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppFrame, Avatar, FakeButton } from "./app-frame";
import { ABSENCE_TYPES, type AbsenceType } from "./absence-types";

// Dos semanas laborales (datos de ejemplo). Índice 1 = hoy, índice 6 = festivo.
const DAYS = [
  { d: "lun", n: 30 },
  { d: "mar", n: 1 },
  { d: "mié", n: 2 },
  { d: "jue", n: 3 },
  { d: "vie", n: 4 },
  { d: "lun", n: 7 },
  { d: "mar", n: 8 },
  { d: "mié", n: 9 },
  { d: "jue", n: 10 },
  { d: "vie", n: 11 },
];
const TODAY = 1;
const HOLIDAY = 6;

type Row = {
  name: string;
  area: string;
  bars: { type: AbsenceType; from: number; to: number }[];
};

const ROWS: Row[] = [
  { name: "Andrés Gómez", area: "Operaciones", bars: [{ type: "vac", from: 0, to: 4 }] },
  { name: "Laura Méndez", area: "Talento humano", bars: [{ type: "perm", from: 1, to: 1 }] },
  { name: "Juan Esteban Ruiz", area: "Operaciones", bars: [{ type: "inc", from: 0, to: 2 }] },
  { name: "Camilo Torres", area: "Tecnología", bars: [{ type: "lic", from: 3, to: 9 }] },
  { name: "Valentina Ríos", area: "Comercial", bars: [] },
  { name: "Mariana Castro", area: "Comercial", bars: [{ type: "vac", from: 5, to: 8 }] },
  { name: "Daniela Pardo", area: "Finanzas", bars: [] },
];
const DRAG_ROW = 4;
const DRAG_FROM = 7;
const DRAG_TO = 9;

function subscribeMq(cb: () => void) {
  const mq = window.matchMedia("(min-width: 640px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useWide() {
  return useSyncExternalStore(
    subscribeMq,
    () => window.matchMedia("(min-width: 640px)").matches,
    () => true,
  );
}

/**
 * Fase del gesto "arrastrar sobre los días":
 * 0 reposo · 1 cursor · 2 arrastrando · 3 pendiente · 4 aprobada
 */
type Phase = 0 | 1 | 2 | 3 | 4;

export function CalendarMock({
  animate = true,
  onBrand = false,
  className,
}: {
  animate?: boolean;
  /** El botón de repetir se dibuja sobre el campo índigo. */
  onBrand?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const wide = useWide();
  const playable = animate && !reduce;
  const [phase, setPhase] = useState<Phase>(playable ? 0 : 4);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!playable || !inView) return;
    const steps: [Phase, number][] = [
      [1, 700],
      [2, 1300],
      [3, 2600],
      [4, 4300],
    ];
    const timers = steps.map(([p, t]) => window.setTimeout(() => setPhase(p), t));
    return () => timers.forEach(clearTimeout);
  }, [playable, inView, run]);

  const offset = wide ? 0 : 5;
  const days = DAYS.slice(offset);
  const cols = days.length;
  const clamp = (from: number, to: number) => {
    const a = Math.max(from - offset, 0);
    const b = to - offset;
    return b < 0 ? null : { start: a + 2, end: b + 3 };
  };

  const gridStyle = {
    gridTemplateColumns: `minmax(0,${wide ? "11.5rem" : "7.5rem"}) repeat(${cols}, minmax(0,1fr))`,
  };
  const pending = phase === 3 ? 3 : 2;
  const drag = clamp(DRAG_FROM, DRAG_TO)!;

  return (
    <div ref={ref} className={className}>
      <AppFrame
        active="calendario"
        title="Calendario"
        subtitle="Ausencias y novedades del equipo. Arrastra sobre los días para registrar una nueva."
        pending={pending}
        actions={
          <>
            <FakeButton className="hidden sm:inline-flex">
              <Filter className="h-3.5 w-3.5" aria-hidden="true" /> Todas las áreas
            </FakeButton>
            <FakeButton primary>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Nueva ausencia
            </FakeButton>
          </>
        }
      >
        <div className="flex items-center justify-between px-4 pt-3 sm:px-5">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <ChevronLeft className="h-4 w-4 text-ink-mute" aria-hidden="true" />
            <ChevronRight className="h-4 w-4 text-ink-mute" aria-hidden="true" />
            <span className="ml-1">{wide ? "30 nov – 11 dic" : "7 – 11 dic"}</span>
          </div>
          <div className="flex rounded-md bg-paper p-0.5 text-[0.6875rem] font-medium">
            <span className="rounded px-2 py-0.5 text-ink-mute">Mes</span>
            <span className="rounded bg-white px-2 py-0.5 shadow-[0_1px_2px_oklch(0.3_0.05_274/0.12)]">Equipo</span>
          </div>
        </div>

        <div className="relative px-2 pb-3 pt-2 sm:px-3">
          {/* Cabecera de días */}
          <div className="grid items-end text-center" style={gridStyle}>
            <span />
            {days.map((day, i) => {
              const idx = i + offset;
              return (
                <div key={idx} className="pb-2">
                  <p className="text-[0.625rem] uppercase tracking-wide text-ink-mute">{day.d}</p>
                  <p
                    className={cn(
                      "tabular mx-auto mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                      idx === TODAY && "bg-brand-600 text-white",
                      idx === HOLIDAY && "text-no",
                    )}
                  >
                    {day.n}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Filas */}
          <div className="relative">
            {/* Columnas de fondo: hoy y festivo */}
            <div className="pointer-events-none absolute inset-0 grid" style={gridStyle} aria-hidden="true">
              <span />
              {days.map((_, i) => {
                const idx = i + offset;
                return (
                  <span
                    key={idx}
                    className={cn(
                      "border-l border-line/70",
                      idx === TODAY && "bg-brand-50",
                      idx === HOLIDAY && "bg-no-soft/70",
                    )}
                  />
                );
              })}
            </div>
            {offset <= HOLIDAY && (
              <div className="pointer-events-none absolute inset-y-0 grid w-full" style={gridStyle} aria-hidden="true">
                <span
                  className="self-end pb-1 text-center text-[0.5625rem] font-medium uppercase tracking-wide text-no"
                  style={{ gridColumn: `${HOLIDAY - offset + 2} / span 1` }}
                >
                  Festivo
                </span>
              </div>
            )}

            {ROWS.map((row, r) => ({ row, r }))
              .filter(({ row, r }) => wide || r === DRAG_ROW || row.bars.some((b) => b.to >= offset))
              .map(({ row, r }) => (
              <div
                key={row.name}
                className="relative grid h-11 items-center border-t border-line/70"
                style={gridStyle}
              >
                <div className="flex min-w-0 items-center gap-2 pl-2 pr-1">
                  <Avatar name={row.name} className="hidden sm:inline-flex" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{row.name}</p>
                    <p className="truncate text-[0.625rem] text-ink-mute">{row.area}</p>
                  </div>
                </div>

                {row.bars.map((bar) => {
                  const span = clamp(bar.from, bar.to);
                  if (!span) return null;
                  const t = ABSENCE_TYPES[bar.type];
                  return (
                    <div
                      key={bar.from}
                      className={cn(
                        "relative z-10 mx-0.5 flex h-7 items-center gap-1.5 overflow-hidden rounded-md px-2 text-[0.6875rem] font-medium ring-1 ring-inset",
                        t.bar,
                      )}
                      style={{ gridColumn: `${span.start} / ${span.end}`, gridRow: 1 }}
                    >
                      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", t.dot)} />
                      <span className="truncate">{t.label}</span>
                    </div>
                  );
                })}

                {r === DRAG_ROW && (
                  <div
                    className="relative z-10 mx-0.5 h-7"
                    style={{ gridColumn: `${drag.start} / ${drag.end}`, gridRow: 1 }}
                  >
                    {/* Selección mientras se arrastra */}
                    {phase === 2 && (
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-md bg-brand-200/70 ring-1 ring-inset ring-brand-500"
                        initial={{ width: "33%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.1, ease: [0.45, 0, 0.2, 1] }}
                      />
                    )}
                    {/* Ausencia registrada */}
                    {phase >= 3 && (
                      <motion.div
                        initial={{ opacity: 0.4, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "absolute inset-0 flex items-center gap-1.5 overflow-hidden rounded-md px-2 text-[0.6875rem] font-medium",
                          phase === 3
                            ? "bg-wait-soft text-wait outline-1 outline-dashed -outline-offset-1 outline-wait/60"
                            : "bg-vac-soft text-brand-800 ring-1 ring-inset ring-vac/30",
                        )}
                      >
                        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", phase === 3 ? "bg-wait" : "bg-vac")} />
                        <span className="truncate">{phase === 3 ? "Vacaciones · pendiente" : "Vacaciones"}</span>
                      </motion.div>
                    )}
                    {/* Cursor */}
                    <AnimatePresence>
                      {(phase === 1 || phase === 2) && (
                        <motion.span
                          className="absolute top-3 z-20 text-ink drop-shadow-[0_2px_3px_oklch(0.2_0.02_270/0.35)]"
                          initial={{ opacity: 0, left: "6%", y: 14 }}
                          animate={
                            phase === 1
                              ? { opacity: 1, left: "10%", y: 0 }
                              : { opacity: 1, left: "92%", y: 0 }
                          }
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: phase === 1 ? 0.5 : 1.1, ease: [0.45, 0, 0.2, 1] }}
                          aria-hidden="true"
                        >
                          <MousePointer2 className="h-4 w-4 fill-white" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Aviso de la app */}
          <AnimatePresence mode="wait">
            {phase >= 3 && (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 right-4 z-30 flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-xs font-medium text-white shadow-[0_8px_24px_-6px_oklch(0.2_0.02_270/0.45)]"
              >
                <CheckCircle2 className={cn("h-4 w-4", phase === 3 ? "text-brand-300" : "text-[oklch(0.8_0.12_160)]")} aria-hidden="true" />
                {phase === 3 ? "Solicitud enviada para aprobación" : "Ausencia aprobada."}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line px-4 py-2.5 text-[0.6875rem] text-ink-soft sm:px-5">
          {Object.values(ABSENCE_TYPES).map((t) => (
            <span key={t.label} className="inline-flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", t.dot)} />
              {t.label}
            </span>
          ))}
          <span className="ml-auto hidden text-ink-mute sm:inline">Datos de ejemplo</span>
        </div>
      </AppFrame>

      {playable && phase === 4 && (
        <button
          type="button"
          onClick={() => {
            setPhase(0);
            setRun((n) => n + 1);
          }}
          className={cn(
            "mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            onBrand ? "text-brand-100 hover:text-white" : "text-ink-mute hover:text-brand-700",
          )}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Ver de nuevo cómo se registra una ausencia
        </button>
      )}
    </div>
  );
}
