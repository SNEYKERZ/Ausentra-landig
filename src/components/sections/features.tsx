import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Building2,
  CalendarDays,
  CheckCheck,
  Clock3,
  FileText,
  Flag,
  Inbox,
  KeyRound,
  Layers,
  Tags,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ApprovalMock,
  CommunityMock,
  DashboardMock,
  DocumentsMock,
  ReportsMock,
} from "@/components/mockups/panels";

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Story({
  title,
  body,
  points,
  mock,
  flip,
}: {
  title: string;
  body: string;
  points: string[];
  mock: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={cn("min-w-0 lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
        <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[2rem]">
          {title}
        </h3>
        <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-soft">{body}</p>
        <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-[0.9375rem] text-ink-soft">
              <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1} className={cn("min-w-0 lg:col-span-7", flip && "lg:order-1 lg:col-start-1")}>
        {mock}
      </Reveal>
    </div>
  );
}

const MODULES = [
  { icon: CalendarDays, name: "Calendario del equipo", text: "Vista por equipo o por mes, filtros por área y leyenda por tipo de ausencia." },
  { icon: CheckCheck, name: "Aprobaciones", text: "Aprobar o rechazar con motivo, respetando los bloqueos operacionales." },
  { icon: Users, name: "Usuarios y vacaciones", text: "Saldos por colaborador y días que vencen en los próximos 90 días." },
  { icon: Layers, name: "Áreas", text: "Organiza a las personas por área para filtrar, aprobar y reportar." },
  { icon: Tags, name: "Tipos de ausencia", text: "Vacaciones, permisos, licencias o los que use tu empresa, cada uno con su color." },
  { icon: Inbox, name: "Solicitudes a RR. HH.", text: "Certificados y trámites con asunto, descripción y estado." },
  { icon: FileText, name: "Documentos", text: "Contratos y políticas para consultar, descargar y firmar." },
  { icon: Clock3, name: "Horas extra", text: "Registro personal y vista del equipo para quien aprueba." },
  { icon: BarChart3, name: "Reportes", text: "Ausencias por persona o por área en cualquier período, exportables a CSV." },
  { icon: Flag, name: "Festivos", text: "Festivos oficiales de Colombia marcados en el calendario." },
  { icon: Building2, name: "Empresa", text: "Datos y configuración propios de tu organización." },
  { icon: KeyRound, name: "Seguridad", text: "Inicio de sesión con verificación en dos pasos." },
];

export function Features() {
  return (
    <>
      <section id="funciones" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
              Del primer café a la última aprobación, sin perseguir a nadie.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Así se ve el día a día de quien administra un equipo con Ausentra.
            </p>
          </Reveal>

          <div className="mt-20 space-y-28 sm:space-y-36">
            <Story
              title="Lo primero que ves al entrar: quién está y quién no."
              body="El inicio responde las preguntas de cada mañana: quién está fuera hoy, quién sale en los próximos días, qué aprobaciones esperan y qué vacaciones están por vencer."
              points={[
                "Ausentes de hoy con el tipo de ausencia y hasta cuándo.",
                "Días de vacaciones que vencen en los próximos 90 días.",
                "Aprobaciones pendientes, sin abrir el correo.",
              ]}
              mock={<DashboardMock />}
            />

            <Story
              flip
              title="Aprobar toma un clic. Rechazar, también deja el porqué."
              body="Cada solicitud llega a quien debe revisarla con las fechas, los días hábiles y el saldo que queda. Si el período choca con un cierre o una temporada alta, Ausentra lo advierte."
              points={[
                "Días hábiles calculados sin contar fines de semana ni festivos.",
                "Bloqueos operacionales para fechas en las que nadie puede salir.",
                "Motivo del rechazo visible para el colaborador.",
              ]}
              mock={<ApprovalMock />}
            />
          </div>

          <div className="mt-28 grid gap-6 sm:mt-36 lg:grid-cols-2">
            <Reveal className="flex min-w-0 flex-col">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">Comunidad</h3>
              <p className="mb-6 mt-2 max-w-md text-ink-soft">
                Antes de escribirle a alguien, mira si está. El directorio muestra la
                disponibilidad de cada persona hoy.
              </p>
              <CommunityMock className="mt-auto" />
            </Reveal>
            <Reveal delay={0.1} className="flex min-w-0 flex-col">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">Documentos con firma</h3>
              <p className="mb-6 mt-2 max-w-md text-ink-soft">
                Contratos, otrosíes y políticas en un mismo lugar. Cada persona los
                consulta, los descarga y los firma.
              </p>
              <DocumentsMock className="mt-auto" />
            </Reveal>
          </div>

          <div className="mt-28 sm:mt-36">
            <Story
              title="Los números de ausentismo, listos para la reunión."
              body="Filtra por área o por persona en el período que necesites y descarga el resultado en CSV para cruzarlo con nómina."
              points={[
                "Totales por tipo de ausencia y por área.",
                "Cualquier rango de fechas.",
                "Exportación a CSV con un clic.",
              ]}
              mock={<ReportsMock />}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl">
                Los módulos de Ausentra.
              </h2>
              <p className="mt-4 max-w-sm text-ink-soft">
                Cada empresa trabaja en su propio espacio, con sus áreas, tipos de
                ausencia y reglas. Los módulos disponibles dependen del plan.
              </p>
            </Reveal>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {MODULES.map(({ icon: Icon, name, text }) => (
                <div key={name} className="flex gap-3.5 border-t border-line py-5">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold">{name}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{text}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
