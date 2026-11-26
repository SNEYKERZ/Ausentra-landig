export const BRAND = {
  name: "Ausentra",
} as const;

// TODO: datos de contacto de relleno. Reemplazar por los reales antes de publicar.
export const CONTACT = {
  email: "ventas@ausentra.com",
  phoneLabel: "+57 (601) 000 0000",
  phoneHref: "tel:+576010000000",
  city: "Bogotá, Colombia",
  hours: "Lunes a viernes, 8:00 a. m. – 6:00 p. m.",
} as const;

export const NAV_ITEMS = [
  { label: "Funciones", href: "/#funciones" },
  { label: "Recorrido", href: "/tour" },
  { label: "Precios", href: "/#precios" },
  { label: "Contacto", href: "/#contacto" },
] as const;
