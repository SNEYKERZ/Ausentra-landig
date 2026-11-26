import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/brand";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || isOpen
          ? "bg-canvas/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-brand-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/admin/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-mute transition-colors hover:text-ink"
          >
            Admin
          </a>
          <Button asChild size="sm" className="h-9 px-3.5 text-[0.8125rem]">
            <a href="/#precios">Ver planes</a>
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-ink md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="menu-movil"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="menu-movil"
            aria-label="Principal"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-md px-2 py-2.5 text-base font-medium text-ink"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="/admin/login" className="block rounded-md px-2 py-2.5 text-base font-medium text-ink-mute">
                Admin
              </a>
              <Button asChild className="mt-2 w-full">
                <a href="/#precios" onClick={() => setIsOpen(false)}>
                  Ver planes
                </a>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
