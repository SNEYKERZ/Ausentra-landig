import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { SubscriptionPlan } from '@/types'
import { formatPriceCop, formatPriceUsd, getDurationLabel } from '@/services/plans'

interface PricingProps {
  plans: SubscriptionPlan[]
  onSelectPlan: (plan: SubscriptionPlan) => void
}

const includedFeatures = [
  'Gestión de empleados ilimitada',
  'Calendario interactivo',
  'Reportes y estadísticas',
  'Notificaciones en tiempo real',
  'Feriados oficiales Colombia',
  'Soporte por email',
]

export function Pricing({ plans, onSelectPlan }: PricingProps) {
  const [currency, setCurrency] = useState<'cop' | 'usd'>('cop')

  const getPrice = (plan: SubscriptionPlan) => {
    return currency === 'cop' 
      ? formatPriceCop(plan.price_cop)
      : formatPriceUsd(plan.price_usd)
  }

  const getOriginalPrice = (plan: SubscriptionPlan) => {
    return currency === 'cop'
      ? formatPriceCop(plan.original_price_cop)
      : formatPriceUsd(plan.original_price_usd)
  }

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Planes diseñados para tu empresa
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Elige el plan que mejor se adapte a las necesidades de tu organización
          </p>

          <div className="inline-flex items-center p-1 bg-slate-200 rounded-lg">
            <button
              onClick={() => setCurrency('cop')}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all',
                currency === 'cop' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              Colombia (COP)
            </button>
            <button
              onClick={() => setCurrency('usd')}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all',
                currency === 'usd' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              Internacional (USD)
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const isPopular = index === 1
            const hasDiscount = plan.discount_percentage > 0
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  'relative h-full flex flex-col',
                  isPopular && 'border-blue-500 shadow-blue-200'
                )}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Más popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      {hasDiscount && (
                        <span className="text-sm text-slate-500 line-through">
                          {getOriginalPrice(plan)}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-slate-900">
                          {getPrice(plan)}
                        </span>
                        <span className="text-slate-500">/ {getDurationLabel(plan.duration_days).toLowerCase()}</span>
                      </div>
                      {hasDiscount && (
                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          {plan.discount_percentage}% descuento
                        </span>
                      )}
                    </div>
                    
                    <ul className="space-y-3">
                      {includedFeatures.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={isPopular ? 'default' : 'outline'}
                      onClick={() => onSelectPlan(plan)}
                    >
                      {plan.price_cop === 0 ? 'Comenzar gratis' : 'Suscribirse'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          ¿Necesitas un plan personalizado?{' '}
          <a href="#contact" className="text-blue-600 hover:underline">
            Contáctanos
          </a>
        </p>
      </div>
    </section>
  )
}