import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Calendar, Users, FileText, BarChart3, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Pasos del tour - cada uno representa un flujo del aplicativo
const tourSteps = [
  {
    id: 1,
    title: "Panel del Empleado",
    description: "El empleado puede visualizar sus días disponibles, solicitudes pendientes y historial de ausencias en un solo lugar.",
    image: "/images/tour/panel-empleado.png",
    icon: Users,
    features: ["Días de vacaciones disponibles", "Historial de solicitudes", "Próximas ausencias confirmadas"],
  },
  {
    id: 2,
    title: "Solicitud de Ausencia",
    description: "El empleado selecciona el tipo de ausencia, fechas y adjunta la documentación necesaria.",
    image: "/images/tour/solicitud-ausencia.png",
    icon: FileText,
    features: ["Tipos: Vacaciones, Permiso, Incapacidad", "Selección de fechas", "Adjunto de soportes"],
  },
  {
    id: 3,
    title: "Aprobación de Solicitud",
    description: "El gerente o RH recibe la solicitud, revisa los detalles y approves o rechazar con comentarios.",
    image: "/images/tour/aprobacion-solicitud.png",
    icon: CheckCircle,
    features: ["Notificación en tiempo real", "Validación de días disponibles", "Comentarios opcionales"],
  },
  {
    id: 4,
    title: "Calendario Visual",
    description: "Visualiza todo el equipo en un calendario interactivo. Identifica ausencias por área, tipo o colaborador.",
    image: "/images/tour/calendario.png",
    icon: Calendar,
    views: ["Vista mensual", "Vista semanal", "Filtros por departamento"],
  },
  {
    id: 5,
    title: "Reportes y Estadísticas",
    description: "Genera reportes detallados de ausencias por empleado, área o período. Ideal para RRHH.",
    image: "/images/tour/reportes.png",
    icon: BarChart3,
    features: ["Exportar a Excel/PDF", "Gráficos de tendencias", "Análisis por período"],
  },
];

export function Tour() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);

  // Auto-advance en modo carrusel (opcional)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % tourSteps.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextStep = () => setActiveStep((activeStep + 1) % tourSteps.length);
  const prevStep = () => setActiveStep((activeStep - 1 + tourSteps.length) % tourSteps.length);

  const currentStep = tourSteps[activeStep];
  const IconComponent = currentStep.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */ }
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">Ausentra</span>
              </a>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">Tour Visual</span>
            </div>
            <a href="/" className="text-sm text-slate-500 hover:text-blue-600">
              ← Volver al inicio
            </a>
          </div>
        </div>
      </header>

      {/* Hero del tour */ }
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Play className="w-4 h-4" />
              Descubre cómo funciona
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Una forma inteligente de gestionar <span className="text-blue-600">las ausencias</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
          >
            Descubre en 5 pasos cómo Ausentra simplifica la gestión de vacaciones, permisos y licencias de tu equipo.
          </motion.p>

          {/* Toggle Video/Images */ }
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={() => setIsVideoMode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isVideoMode ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Ver Tour Visual
            </button>
            <button
              onClick={() => setIsVideoMode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isVideoMode ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Ver Video Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */ }
      {isVideoMode ? (
        /* Sección de Video */
        <section className="py-16 bg-slate-900">
          <div className="max-w-5xl mx-auto px-4">
            <div className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-blue-700 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-slate-400">
                  Video demo en proceso de grabación
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Mientras, explorá el tour visual ↓
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Tour Visual - Carrusel */
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Indicadores de progreso */ }
            <div className="flex items-center justify-center gap-2 mb-8">
              {tourSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeStep
                      ? "bg-blue-600 w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Ir a ${step.title}`}
                />
              ))}
            </div>

            {/* Contenido del paso actual */ }
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Imagen/Screenshot */ }
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                  {/* Browser chrome simulado */ }
                  <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-4 text-sm text-slate-500">Ausentra - {currentStep.title}</span>
                  </div>
                  
                  {/* Placeholder de imagen - luego reemplazar con screenshot real */ }
                  <div className="p-8 bg-slate-50 min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-slate-600 font-medium">
                        {currentStep.title}
                      </p>
                      <p className="text-slate-400 text-sm mt-2">
                        Screenshot en proceso
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navegación lateral */ }
                <button
                  onClick={prevStep}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <button
                  onClick={nextStep}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </motion.div>

              {/* Descripción */ }
              <motion.div
                key={`desc-${activeStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-blue-600 font-medium">
                    Paso {currentStep.id} de {tourSteps.length}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-slate-900">
                  {currentStep.title}
                </h2>

                <p className="text-lg text-slate-600">
                  {currentStep.description}
                </p>

                {/* Lista de features */ }
                <ul className="space-y-3">
                  {(currentStep.features || currentStep.views || []).map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Indicador de siguiente */ }
                <div className="pt-4 flex items-center gap-2 text-sm text-slate-500">
                  <span>Siguiente:</span>
                  <span className="font-medium text-slate-700">
                    {tourSteps[(activeStep + 1) % tourSteps.length].title}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */ }
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            ¿Listo para simplificar la gestión de ausencias?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Comenzá tu prueba gratuita de 14 días. No requiere tarjeta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg">
              Comenzar prueba gratuita
            </Button>
            <Button size="lg" variant="outline">
              Contactar ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer simple */ }
      <footer className="bg-slate-50 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2024 Ausentra. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}