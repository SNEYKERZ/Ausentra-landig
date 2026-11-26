import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck2, Coins, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarMock } from "@/components/mockups/calendar-mock";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-end gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <motion.h1
            {...rise(0)}
            className="text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            Sabes quién falta hoy. Y quién faltará la próxima semana.
          </motion.h1>

          <motion.div {...rise(0.1)} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              Ausentra reúne vacaciones, permisos, licencias e incapacidades en
              un solo calendario del equipo, con aprobaciones y saldos al día.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#precios">
                  Ver planes y precios
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contacto">Hablar con ventas</a>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-14 sm:mt-16">
          {/* Campo índigo bajo la vista del producto */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 top-28 w-screen -translate-x-1/2 bg-brand-600 bg-[radial-gradient(120%_70%_at_50%_0%,oklch(0.6_0.17_274)_0%,transparent_65%)] sm:top-40"
          />
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1, delay: 0.2, ease },
                })}
            className="relative"
          >
            <CalendarMock onBrand />
          </motion.div>

          <ul className="relative flex flex-col gap-3 py-10 text-sm text-brand-50 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:py-12">
            <li className="flex items-center gap-2">
              <CalendarCheck2
                className="h-4 w-4 text-brand-200"
                aria-hidden="true"
              />
              Festivos oficiales de Colombia incluidos
            </li>
            <li className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-brand-200" aria-hidden="true" />
              Pago en pesos colombianos o dólares
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck
                className="h-4 w-4 text-brand-200"
                aria-hidden="true"
              />
              Acceso con verificación en dos pasos
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
