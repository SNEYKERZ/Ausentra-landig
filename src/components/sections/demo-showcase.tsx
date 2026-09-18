import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, LayoutDashboard, Map, Settings2, Users } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const productModules = [
  {
    title: 'Dashboard',
    eyebrow: 'Una vista de toda la operación',
    description: 'Consulta disponibilidad, pendientes y ausencias del equipo desde un solo lugar.',
    image: '/product/dashboard.png',
    icon: LayoutDashboard,
    accent: 'bg-blue-600',
    tags: ['Disponibilidad', 'Pendientes', 'Indicadores'],
  },
  {
    title: 'Calendario de ausencias',
    eyebrow: 'Planificación que todos pueden ver',
    description: 'Visualiza vacaciones, permisos y novedades por fecha, área o colaborador.',
    image: '/product/calendario.png',
    icon: CalendarDays,
    accent: 'bg-emerald-600',
    tags: ['Mes y semana', 'Filtros', 'Estados'],
  },
  {
    title: 'Gestión de usuarios',
    eyebrow: 'Personas y permisos organizados',
    description: 'Administra colaboradores, roles y accesos para que cada persona vea lo que necesita.',
    image: '/product/gestion-usuarios.png',
    icon: Users,
    accent: 'bg-violet-600',
    tags: ['Colaboradores', 'Roles', 'Accesos'],
  },
  {
    title: 'Áreas',
    eyebrow: 'La estructura de tu empresa',
    description: 'Ordena la operación por equipos y áreas para tomar decisiones con mejor contexto.',
    image: '/product/areas.png',
    icon: Map,
    accent: 'bg-amber-500',
    tags: ['Organización', 'Equipos', 'Responsables'],
  },
  {
    title: 'Comunidad',
    eyebrow: 'Información que conecta al equipo',
    description: 'Comparte novedades y mantén alineadas a las personas en un mismo espacio.',
    image: '/product/comunidad.png',
    icon: Users,
    accent: 'bg-cyan-600',
    tags: ['Novedades', 'Comunicaciones', 'Cultura'],
  },
  {
    title: 'Tipos de ausencias y novedades',
    eyebrow: 'Reglas adaptadas a tu operación',
    description: 'Configura los tipos de solicitud que usa tu empresa y define cómo se gestionan.',
    image: '/product/tipos-ausencias-novedades.png',
    icon: Settings2,
    accent: 'bg-rose-600',
    tags: ['Configuración', 'Políticas', 'Flujos'],
  },
]

export function DemoShowcase() {
  const [activeModule, setActiveModule] = useState(0)
  const module = productModules[activeModule]
  const ModuleIcon = module.icon

  return (
    <section id="demos" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Así se ve Ausentra por dentro
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Todo tu equipo, en una experiencia hecha para avanzar
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Explora los módulos que convierten la gestión de ausencias y personas en una operación clara, conectada y fácil de administrar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.72fr_1.9fr] gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:pt-3"
          >
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <p className="text-sm font-medium text-slate-500">Módulos del producto</p>
              <span className="text-sm text-slate-400">{activeModule + 1} / {productModules.length}</span>
            </div>
            <nav className="grid grid-cols-2 gap-2 lg:flex lg:flex-col" aria-label="Módulos de Ausentra">
              {productModules.map((item, index) => {
                const ItemIcon = item.icon
                const isActive = activeModule === index

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveModule(index)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group flex items-center gap-3 text-left rounded-xl px-3 py-3 transition-all ${isActive ? 'bg-white shadow-md ring-1 ring-slate-200' : 'hover:bg-white/70'}`}
                  >
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? `${item.accent} text-white` : 'bg-white text-slate-500 group-hover:text-blue-600'}`}>
                      <ItemIcon className="w-4 h-4" />
                    </span>
                    <span className={`text-sm font-medium leading-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                      {item.title}
                    </span>
                  </button>
                )
              })}
            </nav>
            <div className="hidden lg:flex items-center gap-2 mt-8 text-sm text-slate-500">
              <Check className="w-4 h-4 text-emerald-600" />
              Un sistema conectado para Gestión Humana
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative min-w-0"
          >
            <div className="relative bg-slate-900 rounded-2xl p-2 sm:p-3 shadow-2xl">
              <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full bg-blue-200/50 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />
              <div className="relative bg-white rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-slate-500 truncate">app.ausentra.co / {module.title.toLowerCase()}</span>
                </div>
                <div className="relative bg-slate-100 p-3 sm:p-5 md:p-6">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={module.image}
                      src={module.image}
                      alt={`Vista del módulo ${module.title} de Ausentra`}
                      loading={activeModule === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.015 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="block w-full h-auto max-h-[600px] object-contain object-top rounded-lg shadow-lg ring-1 ring-slate-200"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-2">{module.eyebrow}</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{module.title}</h3>
                  </div>
                  <span className={`hidden sm:flex shrink-0 w-10 h-10 rounded-xl ${module.accent} items-center justify-center text-white`}>
                    <ModuleIcon className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-slate-600 mt-3 max-w-2xl">{module.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {module.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-4 mt-7 pt-5 border-t border-slate-200">
              <div className="flex gap-1.5" aria-label="Seleccionar módulo">
                {productModules.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveModule(index)}
                    aria-label={`Ver ${item.title}`}
                    aria-current={activeModule === index ? 'true' : undefined}
                    className={`h-1.5 rounded-full transition-all ${activeModule === index ? 'w-8 bg-blue-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
                  />
                ))}
              </div>
              <Button asChild variant="outline" className="gap-2 shrink-0">
                <a href="#contact">
                  Conocer Ausentra
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
