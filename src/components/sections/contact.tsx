import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/brand";

export function Contact() {
  const details = [
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, label: "Teléfono", value: CONTACT.phoneLabel, href: CONTACT.phoneHref },
    { icon: MapPin, label: "Oficina", value: CONTACT.city },
    { icon: Clock3, label: "Horario", value: CONTACT.hours },
  ];

  return (
    <section id="contacto" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
            ¿Todavía con las vacaciones en una hoja de cálculo?
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            Cuéntanos cuántas personas tiene tu equipo y cómo manejan hoy las ausencias.
            Resolvemos tus dudas y te ayudamos a elegir el plan adecuado.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={`mailto:${CONTACT.email}?subject=Quiero%20conocer%20Ausentra`}>
                Escribir a ventas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#precios">Ver planes</a>
            </Button>
          </div>
        </div>

        <dl className="self-end">
          {details.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-center gap-4 border-t border-line py-5 last:border-b">
              <Icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <dt className="w-20 shrink-0 text-sm text-ink-mute">{label}</dt>
              <dd className="min-w-0 font-medium">
                {href ? (
                  <a href={href} className="break-words hover:text-brand-700 hover:underline">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
