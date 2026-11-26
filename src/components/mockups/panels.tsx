import { AlertTriangle, Download, FileSignature, FileText, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppFrame, Avatar, FakeButton, Pill } from "./app-frame";
import { ABSENCE_TYPES } from "./absence-types";

/* Todos los nombres, fechas y cifras son datos de ejemplo. */

export function DashboardMock({ className, sidebar = false }: { className?: string; sidebar?: boolean }) {
  const away = [
    { name: "Andrés Gómez", type: "vac" as const, until: "hasta el vie 4 dic" },
    { name: "Laura Méndez", type: "perm" as const, until: "solo hoy" },
    { name: "Juan Esteban Ruiz", type: "inc" as const, until: "hasta el mié 2 dic" },
  ];
  const expiring = [
    { name: "Daniela Pardo", days: 6, date: "15 ene 2027" },
    { name: "Camilo Torres", days: 4, date: "2 feb 2027" },
    { name: "Mariana Castro", days: 9, date: "28 feb 2027" },
  ];
  return (
    <AppFrame
      active="inicio"
      title="Inicio"
      subtitle="Disponibilidad del equipo, aprobaciones pendientes y saldos de vacaciones."
      sidebar={sidebar}
      className={className}
    >
      <div className="grid gap-px bg-line sm:grid-cols-3">
        {[
          { k: "Ausentes hoy", v: "3", note: "de 24 personas" },
          { k: "Con ausencia próxima", v: "5", note: "en los próximos 14 días" },
          { k: "Aprobaciones pendientes", v: "2", note: "la más antigua, hace 1 día" },
        ].map((s) => (
          <div key={s.k} className="bg-white px-4 py-3">
            <p className="text-[0.6875rem] text-ink-mute">{s.k}</p>
            <p className="tabular mt-0.5 text-2xl font-semibold tracking-[-0.02em]">{s.v}</p>
            <p className="text-[0.6875rem] text-ink-mute">{s.note}</p>
          </div>
        ))}
      </div>
      <div className="grid border-t border-line md:grid-cols-[1.2fr_1fr]">
        <div className="p-4">
          <p className="mb-2 text-xs font-semibold">Fuera hoy</p>
          <ul className="divide-y divide-line">
            {away.map((p) => (
              <li key={p.name} className="flex items-center gap-2.5 py-2">
                <Avatar name={p.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{p.name}</p>
                  <p className="text-[0.6875rem] text-ink-mute">{p.until}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[0.6875rem] text-ink-soft">
                  <span className={cn("h-1.5 w-1.5 rounded-full", ABSENCE_TYPES[p.type].dot)} />
                  {ABSENCE_TYPES[p.type].label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line p-4 md:border-l md:border-t-0">
          <p className="text-xs font-semibold">Próximos vencimientos</p>
          <p className="mb-2 text-[0.6875rem] text-ink-mute">Días que vencen en los próximos 90 días.</p>
          <ul className="space-y-2">
            {expiring.map((e) => (
              <li key={e.name} className="flex items-baseline justify-between gap-2 text-xs">
                <span className="truncate">{e.name}</span>
                <span className="tabular whitespace-nowrap text-ink-soft">
                  <b className="font-semibold text-wait">{e.days} días</b> · {e.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppFrame>
  );
}

export function ApprovalMock({ className }: { className?: string }) {
  return (
    <AppFrame
      active="aprobaciones"
      title="Aprobaciones"
      subtitle="Ausencias y novedades asignadas a ti para aprobar o rechazar."
      sidebar={false}
      className={className}
    >
      <ul className="divide-y divide-line">
        <li className="p-4">
          <div className="flex items-start gap-3">
            <Avatar name="Valentina Ríos" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">Valentina Ríos</p>
                <Pill tone="wait">Pendiente</Pill>
              </div>
              <p className="tabular mt-0.5 text-xs text-ink-soft">
                Vacaciones · mié 9 – vie 11 dic · <b className="font-semibold text-ink">3 días hábiles</b>
              </p>
              <p className="mt-1 text-[0.6875rem] text-ink-mute">Saldo después de aprobar: 8 días</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2 pl-10">
            <FakeButton primary>Aprobar ausencia</FakeButton>
            <FakeButton>Rechazar</FakeButton>
          </div>
        </li>
        <li className="bg-canvas p-4">
          <div className="flex items-start gap-3">
            <Avatar name="Sebastián Mora" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">Sebastián Mora</p>
                <Pill tone="no">Rechazando</Pill>
              </div>
              <p className="tabular mt-0.5 text-xs text-ink-soft">Permiso · lun 21 dic · 1 día</p>
              <p className="mt-2 flex items-center gap-1.5 rounded-md bg-wait-soft px-2 py-1.5 text-[0.6875rem] font-medium text-wait">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                El período solicitado está en bloqueo operacional
              </p>
              <p className="mt-2 text-[0.6875rem] font-medium">Motivo del rechazo</p>
              <p className="mt-1 rounded-md bg-white px-2.5 py-2 text-xs text-ink-soft ring-1 ring-line">
                Cierre contable de fin de año. ¿Lo movemos al 28 de diciembre?
              </p>
            </div>
          </div>
        </li>
      </ul>
    </AppFrame>
  );
}

export function CommunityMock({ className }: { className?: string }) {
  const people = [
    { name: "Daniela Pardo", area: "Finanzas", status: <Pill tone="ok">Disponible</Pill> },
    { name: "Andrés Gómez", area: "Operaciones", status: <Pill tone="neutral">Ausente hasta el 4 dic</Pill> },
    { name: "Mariana Castro", area: "Comercial", status: <Pill tone="wait">Ausencia desde el 7 dic</Pill> },
    { name: "Camilo Torres", area: "Tecnología", status: <Pill tone="wait">Ausencia desde el 3 dic</Pill> },
    { name: "Sebastián Mora", area: "Tecnología", status: <Pill tone="ok">Disponible</Pill> },
  ];
  return (
    <AppFrame
      active="comunidad"
      title="Comunidad"
      subtitle="Directorio interno del equipo con la disponibilidad de cada persona hoy."
      sidebar={false}
      className={className}
    >
      <div className="flex flex-wrap gap-2 border-b border-line px-4 py-2.5">
        <span className="inline-flex flex-1 items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-xs text-ink-mute ring-1 ring-line">
          <Search className="h-3.5 w-3.5" aria-hidden="true" /> Buscar en la comunidad
        </span>
        <FakeButton>Todas las áreas</FakeButton>
      </div>
      <ul className="divide-y divide-line">
        {people.map((p) => (
          <li key={p.name} className="flex items-center gap-3 px-4 py-2.5">
            <Avatar name={p.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{p.name}</p>
              <p className="text-[0.6875rem] text-ink-mute">{p.area}</p>
            </div>
            {p.status}
          </li>
        ))}
      </ul>
    </AppFrame>
  );
}

export function DocumentsMock({ className }: { className?: string }) {
  const docs = [
    { name: "Contrato laboral · otrosí 2026", tone: "wait" as const, label: "Pendiente de firma", action: true },
    { name: "Certificado laboral", tone: "ok" as const, label: "Firmado" },
    { name: "Política de vacaciones", tone: "ok" as const, label: "Firmado" },
    { name: "Acuerdo de teletrabajo", tone: "no" as const, label: "Rechazado" },
  ];
  return (
    <AppFrame
      active="documentos"
      title="Documentos"
      subtitle="Consulta, descarga y firma tus documentos laborales."
      sidebar={false}
      className={className}
    >
      <div className="grid grid-cols-3 gap-px border-b border-line bg-line text-center">
        {[
          ["Pendientes de firma", "1"],
          ["Firmados", "12"],
          ["Rechazados", "1"],
        ].map(([k, v]) => (
          <div key={k} className="bg-white px-2 py-2.5">
            <p className="tabular text-lg font-semibold">{v}</p>
            <p className="text-[0.625rem] text-ink-mute">{k}</p>
          </div>
        ))}
      </div>
      <ul className="divide-y divide-line">
        {docs.map((d) => (
          <li key={d.name} className="flex items-center gap-3 px-4 py-2.5">
            <FileText className="h-4 w-4 shrink-0 text-ink-mute" aria-hidden="true" />
            <p className="min-w-0 flex-1 truncate text-xs font-medium">{d.name}</p>
            {d.action ? (
              <FakeButton primary>
                <FileSignature className="h-3.5 w-3.5" aria-hidden="true" /> Firmar
              </FakeButton>
            ) : (
              <Pill tone={d.tone}>{d.label}</Pill>
            )}
          </li>
        ))}
      </ul>
    </AppFrame>
  );
}

export function ReportsMock({ className }: { className?: string }) {
  const rows = [
    { area: "Operaciones", people: 8, vac: 34, perm: 6, lic: 0, inc: 9 },
    { area: "Comercial", people: 6, vac: 22, perm: 4, lic: 0, inc: 2 },
    { area: "Tecnología", people: 5, vac: 15, perm: 3, lic: 10, inc: 1 },
    { area: "Finanzas", people: 3, vac: 12, perm: 2, lic: 0, inc: 0 },
    { area: "Talento humano", people: 2, vac: 8, perm: 3, lic: 0, inc: 0 },
  ];
  return (
    <AppFrame
      active="reportes"
      title="Reportes"
      subtitle="Ausencias y novedades por persona o por área, con exportación a CSV."
      sidebar={false}
      className={className}
      actions={
        <FakeButton>
          <Download className="h-3.5 w-3.5" aria-hidden="true" /> Exportar CSV
        </FakeButton>
      }
    >
      <div className="flex flex-wrap gap-2 px-4 pt-3">
        <Pill tone="brand">Por área</Pill>
        <Pill tone="neutral">Por persona</Pill>
        <Pill tone="neutral">1 ene – 30 nov 2026</Pill>
      </div>
      <div className="overflow-x-auto px-2 pb-2 pt-2">
        <table className="tabular w-full min-w-[30rem] text-left text-xs">
          <thead>
            <tr className="text-[0.6875rem] text-ink-mute">
              <th className="px-2 py-2 font-medium">Área</th>
              <th className="px-2 py-2 text-right font-medium">Personas</th>
              {(["vac", "perm", "lic", "inc"] as const).map((k) => (
                <th key={k} className="px-2 py-2 text-right font-medium">
                  <span className="inline-flex items-center gap-1">
                    <span className={cn("h-1.5 w-1.5 rounded-full", ABSENCE_TYPES[k].dot)} />
                    {ABSENCE_TYPES[k].label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.area}>
                <td className="px-2 py-2 font-medium">{r.area}</td>
                <td className="px-2 py-2 text-right text-ink-soft">{r.people}</td>
                <td className="px-2 py-2 text-right">{r.vac}</td>
                <td className="px-2 py-2 text-right">{r.perm}</td>
                <td className="px-2 py-2 text-right">{r.lic || "—"}</td>
                <td className="px-2 py-2 text-right">{r.inc || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppFrame>
  );
}
