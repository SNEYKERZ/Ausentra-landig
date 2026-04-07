import type { LicenseToken, LicenseStats, SubscriptionPlan } from "@/types";

const API_BASE = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:8000";

// ===================== PLANES =====================

export async function fetchPlansFromAdmin(): Promise<SubscriptionPlan[]> {
  try {
    const response = await fetch(`${API_BASE}/api/public/plans`);
    if (!response.ok) throw new Error("Failed to fetch plans");
    const json = await response.json();
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

interface LicenseListResponse {
  success: boolean;
  data: LicenseToken[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

/**
 * Obtiene la lista de licencias (requiere auth)
 */
export async function fetchLicenses(
  page = 1,
  perPage = 15,
  status?: string,
  search?: string,
): Promise<LicenseListResponse | null> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });
    if (status && status !== "all") params.append("status", status);
    if (search) params.append("search", search);

    const response = await fetch(
      `${API_BASE}/gestion-sistema/api/licenses?${params}`,
      {
        credentials: "include",
      },
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return null;
  }
}

/**
 * Obtiene las estadísticas de licencias (requiere auth)
 */
export async function fetchLicenseStats(): Promise<LicenseStats | null> {
  try {
    const response = await fetch(
      `${API_BASE}/api/public/admin/licenses/stats`,
      {
        credentials: "include",
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

/**
 * Crea una nueva licencia (requiere auth)
 */
export async function createLicense(data: {
  company_name: string;
  company_email?: string;
  company_nit?: string;
  plan_id: number;
  starts_at: string;
  expires_at: string;
  payment_method?: string;
  amount_paid?: number;
  currency?: string;
  transaction_id?: string;
  notes?: string;
}): Promise<LicenseToken | null> {
  try {
    const response = await fetch(`${API_BASE}/gestion-sistema/api/licenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) return null;
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error creating license:", error);
    return null;
  }
}

/**
 * Actualiza una licencia existente (requiere auth)
 */
export async function updateLicense(
  id: number,
  data: Partial<{
    company_name: string;
    company_email: string;
    company_nit: string;
    plan_id: number;
    starts_at: string;
    expires_at: string;
    is_active: boolean;
    status: string;
    payment_method: string;
    amount_paid: number;
    currency: string;
    transaction_id: string;
    notes: string;
  }>,
): Promise<LicenseToken | null> {
  try {
    const response = await fetch(
      `${API_BASE}/gestion-sistema/api/licenses/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) return null;
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error updating license:", error);
    return null;
  }
}

/**
 * Elimina una licencia (requiere auth)
 */
export async function deleteLicense(id: number): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE}/gestion-sistema/api/licenses/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    return response.ok;
  } catch (error) {
    console.error("Error deleting license:", error);
    return false;
  }
}

/**
 * Renueva una licencia (requiere auth)
 */
export async function renewLicense(
  id: number,
  days: number,
): Promise<LicenseToken | null> {
  try {
    const response = await fetch(
      `${API_BASE}/gestion-sistema/api/licenses/${id}/renew`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ days }),
      },
    );
    if (!response.ok) return null;
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error renewing license:", error);
    return null;
  }
}

/**
 * Activa/desactiva una licencia (requiere auth)
 */
export async function toggleLicense(id: number): Promise<LicenseToken | null> {
  try {
    const response = await fetch(
      `${API_BASE}/gestion-sistema/api/licenses/${id}/toggle`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (!response.ok) return null;
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error toggling license:", error);
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

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
