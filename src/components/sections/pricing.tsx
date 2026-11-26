import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SubscriptionPlan } from "@/types";
import { formatPriceCop, formatPriceUsd, getDurationLabel } from "@/services/plans";

interface PricingProps {
  plans: SubscriptionPlan[];
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

const includedFeatures = [
  "Gestión de empleados ilimitada",
  "Calendario del equipo",
  "Aprobaciones con motivo",
  "Reportes exportables a CSV",
  "Festivos oficiales de Colombia",
  "Soporte por email",
];

function durationPhrase(days: number) {
  if (days === 30) return "por mes";
  return `por ${getDurationLabel(days).toLowerCase()}`;
}

export function Pricing({ plans, onSelectPlan }: PricingProps) {
  const [currency, setCurrency] = useState<"cop" | "usd">("cop");
  const reduce = useReducedMotion();

  const getPrice = (plan: SubscriptionPlan) =>
    currency === "cop" ? formatPriceCop(plan.price_cop) : formatPriceUsd(plan.price_usd);

  const getOriginalPrice = (plan: SubscriptionPlan) =>
    currency === "cop"
      ? formatPriceCop(plan.original_price_cop)
      : formatPriceUsd(plan.original_price_usd);

  return (
    <section id="precios" className="relative overflow-hidden bg-brand-950 py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_0%,oklch(0.38_0.14_274/0.9)_0%,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
              Un precio por empresa, no por persona.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-100">
              Elige cuánto tiempo quieres tu licencia. Entre más larga, menor el valor por mes.
            </p>
          </div>

          <div
            role="group"
            aria-label="Moneda"
            className="inline-flex self-start rounded-lg bg-white/8 p-1 ring-1 ring-inset ring-white/12 lg:self-auto"
          >
            {(
              [
                ["cop", "Colombia · COP"],
                ["usd", "Internacional · USD"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCurrency(key)}
                aria-pressed={currency === key}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  currency === key ? "bg-white text-brand-900" : "text-brand-100 hover:text-white",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const isPopular = index === 1;
            const hasDiscount = plan.discount_percentage > 0;

            return (
              <motion.article
                key={plan.id}
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 24 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.3 },
                      transition: { duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] },
                    })}
                className={cn(
                  "relative flex flex-col rounded-2xl p-7 sm:p-8",
                  isPopular
                    ? "bg-white text-ink shadow-[0_30px_60px_-20px_oklch(0.1_0.05_274/0.7)]"
                    : "bg-white/6 ring-1 ring-inset ring-white/12",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {isPopular && (
                    <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">
                      Más elegido
                    </span>
                  )}
                </div>
                <p className={cn("mt-1 text-sm", isPopular ? "text-ink-soft" : "text-brand-100")}>
                  {plan.description}
                </p>

                <div className="mt-8">
                  <p
                    className={cn(
                      "tabular h-5 text-sm line-through",
                      isPopular ? "text-ink-mute" : "text-brand-200",
                      !hasDiscount && "invisible",
                    )}
                  >
                    {getOriginalPrice(plan)}
                  </p>
                  <p className="tabular mt-1 text-[2.75rem] font-semibold leading-none tracking-[-0.03em]">
                    {getPrice(plan)}
                  </p>
                  <p className={cn("mt-2 text-sm", isPopular ? "text-ink-soft" : "text-brand-100")}>
                    {durationPhrase(plan.duration_days)}
                    {hasDiscount && (
                      <span
                        className={cn(
                          "ml-2 rounded px-1.5 py-0.5 text-xs font-semibold",
                          isPopular ? "bg-ok-soft text-ok" : "bg-white/12 text-white",
                        )}
                      >
                        −{plan.discount_percentage}%
                      </span>
                    )}
                  </p>
                </div>

                <ul
                  className={cn(
                    "mt-8 flex-1 space-y-3 border-t pt-6 text-sm",
                    isPopular ? "border-line" : "border-white/12",
                  )}
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={cn("mt-0.5 h-4 w-4 shrink-0", isPopular ? "text-brand-600" : "text-brand-300")}
                        aria-hidden="true"
                      />
                      <span className={isPopular ? "text-ink-soft" : "text-brand-50"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="mt-8 w-full"
                  variant={isPopular ? "default" : "inverse"}
                  onClick={() => onSelectPlan(plan)}
                >
                  {plan.price_cop === 0 ? "Comenzar gratis" : `Elegir ${plan.name}`}
                </Button>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-brand-100">
          ¿Necesitas condiciones especiales para tu empresa?{" "}
          <a href="#contacto" className="font-medium text-white underline decoration-white/40 hover:decoration-white">
            Habla con ventas
          </a>
        </p>
      </div>
    </section>
  );
}
