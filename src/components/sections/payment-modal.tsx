import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CreditCard,
  Wallet,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SubscriptionPlan } from "@/types";
import {
  formatPriceCop,
  formatPriceUsd,
  getDurationLabel,
} from "@/services/plans";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: SubscriptionPlan | null;
  onPaymentMethodSelect?: (method: "stripe" | "mercadopago") => void;
}

// Datos de empresa
interface CompanyData {
  company_name: string;
  company_email: string;
  company_nit: string;
  contact_name: string;
  contact_phone: string;
}

export function PaymentModal({ open, onOpenChange, plan }: PaymentModalProps) {
  const [step, setStep] = useState<"company" | "payment" | "success">(
    "company",
  );
  const [loading, setLoading] = useState<string | null>(null);
  const [currency] = useState<"cop" | "usd">("cop");
  const [companyData, setCompanyData] = useState<CompanyData>({
    company_name: "",
    company_email: "",
    company_nit: "",
    contact_name: "",
    contact_phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!plan) return null;

  const validateCompanyData = () => {
    const newErrors: Record<string, string> = {};
    if (!companyData.company_name.trim())
      newErrors.company_name = "Nombre de empresa requerido";
    if (!companyData.company_email.trim())
      newErrors.company_email = "Email requerido";
    if (!companyData.company_email.includes("@"))
      newErrors.company_email = "Email inválido";
    if (!companyData.company_nit.trim())
      newErrors.company_nit = "NIT requerido";
    if (!companyData.contact_name.trim())
      newErrors.contact_name = "Nombre de contacto requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompanySubmit = () => {
    if (validateCompanyData()) {
      setStep("payment");
    }
  };

  const handlePay = async (method: "stripe" | "mercadopago") => {
    setLoading(method);

    try {
      const baseUrl =
        import.meta.env.VITE_API_ADMIN_URL || "http://localhost:8000";

      const response = await fetch(
        `${baseUrl}/api/public/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan_id: plan.id,
            payment_method: method,
            currency,
            company_data: companyData, // Enviar datos de empresa
          }),
        },
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No payment URL returned");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleClose = () => {
    setStep("company");
    setCompanyData({
      company_name: "",
      company_email: "",
      company_nit: "",
      contact_name: "",
      contact_phone: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  const getPrice = () => {
    return currency === "cop"
      ? formatPriceCop(plan.price_cop)
      : formatPriceUsd(plan.price_usd);
  };

  // Paso 1: Datos de empresa
  const renderCompanyStep = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-blue-600" />
        <span className="font-medium">Datos de tu empresa</span>
      </div>

      <p className="text-sm text-slate-500 mb-4">
        Necesitamos tus datos para crear tu cuenta de Ausentra luego del pago.
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nombre de la Empresa *
          </label>
          <input
            type="text"
            value={companyData.company_name}
            onChange={(e) =>
              setCompanyData({ ...companyData, company_name: e.target.value })
            }
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company_name ? "border-rose-500" : "border-slate-200"}`}
            placeholder="Mi Empresa S.A.S."
          />
          {errors.company_name && (
            <p className="text-xs text-rose-500 mt-1">{errors.company_name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email empresarial *
            </label>
            <input
              type="email"
              value={companyData.company_email}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  company_email: e.target.value,
                })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company_email ? "border-rose-500" : "border-slate-200"}`}
              placeholder="contacto@empresa.com"
            />
            {errors.company_email && (
              <p className="text-xs text-rose-500 mt-1">
                {errors.company_email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              NIT *
            </label>
            <input
              type="text"
              value={companyData.company_nit}
              onChange={(e) =>
                setCompanyData({ ...companyData, company_nit: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company_nit ? "border-rose-500" : "border-slate-200"}`}
              placeholder="900123456-1"
            />
            {errors.company_nit && (
              <p className="text-xs text-rose-500 mt-1">{errors.company_nit}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre de contacto *
            </label>
            <input
              type="text"
              value={companyData.contact_name}
              onChange={(e) =>
                setCompanyData({ ...companyData, contact_name: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contact_name ? "border-rose-500" : "border-slate-200"}`}
              placeholder="Juan Pérez"
            />
            {errors.contact_name && (
              <p className="text-xs text-rose-500 mt-1">
                {errors.contact_name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              value={companyData.contact_phone}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  contact_phone: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+57 300 123 4567"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleCompanySubmit}>
          Continuar al pago
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  // Paso 2: Pago
  const renderPaymentStep = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setStep("company")}
          className="p-1 hover:bg-slate-100 rounded"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="font-medium">Selecciona método de pago</span>
      </div>

      <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{plan.name}</p>
            <p className="text-sm text-slate-500">
              {getDurationLabel(plan.duration_days)}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {companyData.company_name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{getPrice()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-between h-auto py-4"
          onClick={() => handlePay("stripe")}
          disabled={!!loading}
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5" />
            <div className="text-left">
              <p className="font-medium">Tarjeta de crédito/débito</p>
              <p className="text-xs text-slate-500">
                Visa, Mastercard, American Express
              </p>
            </div>
          </div>
          {loading === "stripe" && <Loader2 className="w-4 h-4 animate-spin" />}
        </Button>

        <Button
          variant="outline"
          className="w-full justify-between h-auto py-4"
          onClick={() => handlePay("mercadopago")}
          disabled={!!loading}
        >
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5" />
            <div className="text-left">
              <p className="font-medium">MercadoPago</p>
              <p className="text-xs text-slate-500">
                PSE, tarjetas, saldo en cuenta
              </p>
            </div>
          </div>
          {loading === "mercadopago" && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg max-h-[90vh] overflow-y-auto">
          {step === "company" && (
            <>
              <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                Completa tus datos
              </Dialog.Title>
              <Dialog.Description className="text-sm text-slate-500">
                Tus datos se guardarán después del pago exitoso
              </Dialog.Description>
              {renderCompanyStep()}
            </>
          )}

          {step === "payment" && (
            <>
              <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                Completar suscripción
              </Dialog.Title>
              {renderPaymentStep()}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
