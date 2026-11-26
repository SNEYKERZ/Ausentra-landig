import { Logo } from "@/components/brand/logo";
import { BRAND, CONTACT, NAV_ITEMS } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="bg-ink text-[oklch(0.78_0.01_270)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed">
              Gestión de ausencias, vacaciones y aprobaciones para empresas en Colombia y
              Latinoamérica.
            </p>
          </div>

          <nav aria-label="Pie de página" className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">
              {CONTACT.email}
            </a>
            <a href="/admin/login" className="transition-colors hover:text-white">
              Admin
            </a>
          </nav>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs">
          © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
