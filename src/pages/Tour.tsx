import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CalendarMock } from "@/components/mockups/calendar-mock";
import {
  ApprovalMock,
  CommunityMock,
  DashboardMock,
  DocumentsMock,
  ReportsMock,
} from "@/components/mockups/panels";
import { cn } from "@/lib/utils";

type Step = {
  id: string;
  short: string;
  title: string;
  description: string;
  points: string[];
  mock: ReactNode;
};

const steps: Step[] = [
  {
    id: "inicio",
    short: "El inicio del día",
    title: "Al entrar, el estado del equipo de un vistazo",
    description:
      "El inicio resume quién está fuera hoy, quién tiene una ausencia próxima, cuántas aprobaciones esperan y qué días de vacaciones están por vencer.",
    points: [
      "Ausentes de hoy, con tipo de ausencia y fecha de regreso",
      "Vencimientos de vacaciones en los próximos 90 días",
      "Aprobaciones pendientes asignadas a ti",
    ],
    mock: <DashboardMock sidebar />,
  },
  {
    id: "registrar",
    short: "Registrar una ausencia",
    title: "Arrastra sobre los días y la ausencia queda registrada",
    description:
      "En el calendario del equipo seleccionas el rango de fechas, eliges el tipo de ausencia y la solicitud pasa a aprobación. Los festivos ya están marcados.",
    points: [
      "Tipos de ausencia configurables, cada uno con su color",
      "Días hábiles calculados sin fines de semana ni festivos",
      "Vista por equipo o por mes, con filtro por área",
    ],
    mock: <CalendarMock />,
  },
  {
    id: "aprobar",
    short: "Aprobar o rechazar",
    title: "Quien aprueba decide con toda la información",
    description:
      "La solicitud llega con fechas, días hábiles y el saldo que quedaría. Si el período está en bloqueo operacional, Ausentra lo advierte; al rechazar, el motivo queda registrado.",
    points: [
      "Aprobación en un clic",
      "Bloqueos operacionales para fechas críticas",
      "Motivo del rechazo visible para el colaborador",
    ],
    mock: <ApprovalMock />,
  },
  {
    id: "equipo",
    short: "Comunidad y documentos",
    title: "El equipo sabe quién está y tiene sus documentos a mano",
    description:
      "La comunidad muestra la disponibilidad de cada persona hoy. En documentos, cada colaborador consulta, descarga y firma sus documentos laborales.",
    points: [
      "Directorio filtrable por área y disponibilidad",
      "Documentos pendientes de firma, firmados y rechazados",
      "Solicitudes a RR. HH., como certificados laborales",
    ],
    mock: (
      <div className="grid gap-4 xl:grid-cols-2 [&>*]:min-w-0">
        <CommunityMock />
        <DocumentsMock />
      </div>
    ),
  },
  {
    id: "reportes",
    short: "Reportes",
    title: "Reportes por persona o por área, en CSV",
    description:
      "Elige el período y la agrupación, revisa los totales por tipo de ausencia y descárgalos para cruzarlos con nómina o presentarlos a gerencia.",
    points: ["Agrupación por área o por persona", "Cualquier rango de fechas", "Exportación a CSV"],
    mock: <ReportsMock />,
  },
];

function useActiveStep(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const STEP_IDS = steps.map((s) => s.id);

export function Tour() {
  const active = useActiveStep(STEP_IDS);
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />

      <main>
        <section className="pb-16 pt-32 sm:pb-20 sm:pt-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.h1
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  })}
              className="max-w-4xl text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl"
            >
              Un recorrido por Ausentra, de la solicitud al reporte.
            </motion.h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Cinco pantallas que muestran cómo se registra, aprueba y consulta una ausencia.
              Las vistas usan datos de ejemplo.
            </p>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-16">
            <nav aria-label="Pasos del recorrido" className="hidden lg:block">
              <ol className="sticky top-28 space-y-1 py-16">
                {steps.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active === s.id ? "step" : undefined}
                      className={cn(
                        "flex items-baseline gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        active === s.id
                          ? "bg-brand-100 font-semibold text-brand-800"
                          : "text-ink-soft hover:text-ink",
                      )}
                    >
                      <span className="tabular text-xs text-ink-mute">{i + 1}</span>
                      {s.short}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 divide-y divide-line">
              {steps.map((s, i) => (
                <article key={s.id} id={s.id} className="scroll-mt-24 py-16 sm:py-20">
                  <p className="tabular text-sm font-medium text-brand-700">
                    Paso {i + 1} de {steps.length}
                  </p>
                  <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
                    {s.description}
                  </p>
                  <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">{s.mock}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-600 py-20 text-white sm:py-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl">
                ¿Listo para tener las ausencias de tu equipo bajo control?
              </h2>
              <p className="mt-4 text-lg text-brand-100">
                Elige un plan o escríbenos y te ayudamos a decidir.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="inverse">
                <a href="/#precios">
                  Ver planes y precios
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-brand-700 shadow-none ring-1 ring-inset ring-white/25 hover:bg-brand-800"
              >
                <a href="/#contacto">Hablar con ventas</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
