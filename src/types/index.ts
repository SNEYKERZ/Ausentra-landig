export interface SubscriptionPlan {
  id: number;
  name: string;
  duration_days: number;
  price_cop: number;
  price_usd: number;
  is_active: boolean;
  display_order: number;
  description: string;
  discount_percentage: number;
  original_price_cop: number;
  original_price_usd: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "card" | "mercadopago";
  last4?: string;
  brand?: string;
}

export interface CheckoutSession {
  planId: number;
  paymentMethod: "stripe" | "mercadopago";
  successUrl: string;
  cancelUrl: string;
}

// Tipos para licencias
export interface LicenseToken {
  id: number;
  token: string;
  company_name: string;
  company_email: string | null;
  company_nit: string | null;
  plan_id: number;
  plan?: {
    id: number;
    name: string;
    duration_days: number;
  };
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  status: "active" | "expired" | "suspended" | "cancelled";
  days_remaining: number;
  is_valid: boolean;
  is_expiring_soon: boolean;
  payment?: {
    method: string | null;
    amount: number;
    currency: string;
    transaction_id: string | null;
    formatted_amount: string;
  };
  statistics?: {
    consultation_count: number;
    last_consulted_at: string | null;
  };
  created_at: string;
  checked_at: string;
}

export interface LicenseStats {
  total_licenses: number;
  active_licenses: number;
  expired_licenses: number;
  expiring_soon_licenses: number;
  revenue: {
    cop: number;
    usd: number;
    formatted_cop: string;
    formatted_usd: string;
  };
  by_plan: Array<{
    plan_id: number;
    plan_name: string;
    count: number;
    active: number;
  }>;
}
