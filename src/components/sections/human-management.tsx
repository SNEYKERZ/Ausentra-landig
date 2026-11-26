import { motion } from 'framer-motion'
import { Check, FileText, History, UserRound, UsersRound } from 'lucide-react'

const capabilities = [
  {
    icon: ClockIcon,
    title: 'Horas extra bajo control',
    description: 'Cada colaborador registra y gestiona sus horas extra con contexto y trazabilidad.',
  },
  {
    icon: UsersRound,
    title: 'Revision de Gestion Humana',
    description: 'El equipo responsable revisa solicitudes y mantiene una aprobacion ordenada.',
  },
  {
    icon: FileText,
    title: 'Contratos en un solo lugar',
    description: 'Crea, almacena y consulta los contratos sin perder documentos importantes.',
  },
  {
    icon: CopyIcon,
    title: 'Plantillas reutilizables',
    description: 'Acelera nuevos procesos con plantillas listas para adaptar a tu organizacion.',
  },
]

function ClockIcon(props: React.ComponentProps<typeof History>) {
  return <History {...props} />
}

function CopyIcon(props: React.ComponentProps<typeof FileText>) {
  return <FileText {...props} />
}

export function HumanManagement() {
  return (
    <section id="gestion-humana" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 items-start min-w-0">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 mb-4">
                <UserRound className="w-4 h-4" />
                Gestion humana conectada
              </span>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Mas claridad para cada persona y cada proceso</h2>
              <p className="text-lg text-slate-600 max-w-2xl">Centraliza la operacion diaria de tu equipo con herramientas que hacen visible cada paso.</p>
            </motion.div>

            <div className="space-y-4">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                    <capability.icon className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{capability.title}</h3>
                    <p className="text-sm text-slate-600">{capability.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 min-w-0 overflow-hidden bg-slate-900 rounded-2xl p-6 text-white shadow-xl"
            aria-label="Indicadores de gestion humana"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-slate-400">Panel de actividad</p>
                <h3 className="text-xl font-semibold mt-1">Gestion Humana</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <UsersRound className="w-5 h-5 text-blue-300" aria-hidden="true" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-slate-400 mt-1">Colaboradores activos</p>
              </div>
              <div className="rounded-xl bg-emerald-400/15 p-4">
                <p className="text-2xl font-bold text-emerald-300">96%</p>
                <p className="text-xs text-slate-400 mt-1">Procesos al dia</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-sm font-medium mb-4">Ultimas actualizaciones</p>
              <div className="space-y-4">
                {['Contrato listo para firma', 'Solicitud revisada por Gestion Humana', 'Plantilla de contrato reutilizada'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-emerald-300" />
                    </div>
                    <p className="text-sm text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}