import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Users, BarChart3, Clock, Shield } from 'lucide-react'

const features = [
  {
    icon: Calendar,
    title: 'Calendario inteligente',
    description: 'Visualiza todas las ausencias de tu equipo en un calendario interactivo con filtros avanzados.',
  },
  {
    icon: Users,
    title: 'Gestión de empleados',
    description: 'Administra fácilmente las solicitudes de permisos, vacaciones y licencias de cada colaborador.',
  },
  {
    icon: BarChart3,
    title: 'Reportes detallados',
    description: 'Genera informes completos sobre ausencias, días acumulados y tendencias del equipo.',
  },
  {
    icon: Clock,
    title: 'Automatización de procesos',
    description: 'Configura flujos de aprobación automáticos según las políticas de tu empresa.',
  },
  {
    icon: Shield,
    title: 'Cumplimiento legal',
    description: 'Mantente al día con las regulaciones laborales colombianas y festividades oficiales.',
  },
  {
    icon: CheckCircle,
    title: 'Notificaciones en tiempo real',
    description: 'Recibe alertas instantáneas sobre nuevas solicitudes, aprobaciones y rechazos.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Todo lo que necesitas para gestionar ausencias
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Una solución completa que se adapta a las necesidades de tu empresa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}