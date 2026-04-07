import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Pricing } from "@/components/sections/pricing";
import { PaymentModal } from "@/components/sections/payment-modal";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { AdminLicenses } from "@/pages/AdminLicenses";
import { AdminLogin } from "@/pages/AdminLogin";
import { usePlansStore } from "@/store/plans-store";
import {
  fetchPlansFromAdmin,
  fetchPlansFromJson,
  getDefaultPlans,
} from "@/services/plans";
import type { SubscriptionPlan } from "@/types";

// Layout para páginas de admin
function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header simple para admin */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-bold text-blue-600">
              Ausentra
            </a>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">Panel de Administración</span>
          </div>
          <a href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Volver al landing
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}

// Página principal del landing
function LandingPage() {
  const { plans, setPlans, selectedPlan, setSelectedPlan } = usePlansStore();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        let fetchedPlans = await fetchPlansFromJson();

        if (fetchedPlans.length === 0) {
          fetchedPlans = await fetchPlansFromAdmin();
        }

        if (fetchedPlans.length > 0) {
          setPlans(fetchedPlans);
        } else {
          setPlans(getDefaultPlans());
        }
      } catch (error) {
        console.error("Error loading plans:", error);
        setPlans(getDefaultPlans());
      }
    };

    loadPlans();
  }, [setPlans]);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing plans={plans} onSelectPlan={handleSelectPlan} />
        <Contact />
      </main>
      <Footer />
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={handleCloseModal}
        plan={selectedPlan}
        onPaymentMethodSelect={(method) => console.log("Selected:", method)}
      />
    </div>
  );
}

// App con rutas
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/licencias"
        element={
          <AdminLayout>
            <AdminLicenses />
          </AdminLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
