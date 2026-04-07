import type { SubscriptionPlan, LicenseToken, LicenseStats } from "@/types";

const API_BASE = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:8000";

// ===================== PLANES =====================

export async function fetchPlansFromAdmin(): Promise<SubscriptionPlan[]> {
  try {
    const response = await fetch(`${API_BASE}/api/public/plans`);
    if (!response.ok) throw new Error("Failed to fetch plans");
    const json = await response.json();
    // El API envuelve los planes en 'data'
    return json.data || json;
  } catch (error) {
    console.error("Error fetching plans from admin:", error);
    return getDefaultPlans();
  }
}

export async function fetchPlansFromJson(): Promise<SubscriptionPlan[]> {
  try {
    const response = await fetch("/api/plans.json");
    if (!response.ok) throw new Error("Failed to fetch plans");
    const data = await response.json();
    return data.plans;
  } catch (error) {
    console.error("Error fetching plans from JSON:", error);
    return getDefaultPlans();
  }
}

export function getDefaultPlans(): SubscriptionPlan[] {
  return [
    {
      id: 1,
      name: "Básico",
      duration_days: 30,
      price_cop: 99000,
      price_usd: 25,
      is_active: true,
      display_order: 1,
      description: "Perfecto para pequeñas empresas",
      discount_percentage: 0,
      original_price_cop: 99000,
      original_price_usd: 25,
    },
    {
      id: 2,
      name: "Profesional",
      duration_days: 180,
      price_cop: 399000,
      price_usd: 99,
      is_active: true,
      display_order: 2,
      description: "Ideal para empresas en crecimiento",
      discount_percentage: 20,
      original_price_cop: 499000,
      original_price_usd: 125,
    },
    {
      id: 3,
      name: "Empresarial",
      duration_days: 365,
      price_cop: 599000,
      price_usd: 149,
      is_active: true,
      display_order: 3,
      description: "Solución completa para grandes empresas",
      discount_percentage: 30,
      original_price_cop: 859000,
      original_price_usd: 215,
    },
  ];
}

// ===================== LICENCIAS =====================

/**
 * Verifica el estado de una licencia
 */
export async function verifyLicense(
  token: string,
): Promise<LicenseToken | null> {
  try {
    const response = await fetch(`${API_BASE}/api/public/license/${token}`);
    if (!response.ok) {
      console.error("License verification failed:", response.status);
      return null;
    }
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error verifying license:", error);
    return null;
  }
}

/**
 * Obtiene estadísticas de licencias (requiere autenticación)
 */
export async function fetchLicenseStats(): Promise<LicenseStats | null> {
  try {
    // Esta ruta requiere auth, así que usamos el endpoint público con auth
    const response = await fetch(
      `${API_BASE}/api/public/admin/licenses/stats`,
      {
        credentials: "include", // Para enviar cookies de sesión
      },
    );
    if (!response.ok) return null;
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching license stats:", error);
    return null;
  }
}

// ===================== HELPERS =====================

export function formatPriceCop(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getDurationLabel(days: number): string {
  switch (days) {
    case 30:
      return "Mensual";
    case 180:
      return "6 Meses";
    case 365:
      return "1 Año";
    default:
      return `${days} días`;
  }
}
