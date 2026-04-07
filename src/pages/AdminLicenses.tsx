import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Eye,
  Edit,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchLicenses,
  fetchLicenseStats,
  fetchPlansFromAdmin,
  createLicense,
  updateLicense,
  deleteLicense,
  renewLicense,
  toggleLicense,
  formatDate,
  formatPriceCop,
} from "@/services/licenses";
import { useLicenseStore } from "@/store/license-store";
import type { LicenseToken, SubscriptionPlan } from "@/types";

// Componente de estadísticas
function StatsCards({ stats }: { stats: any }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{stats.total_licenses}</div>
          <p className="text-sm text-slate-500">Total Licencias</p>
        </CardContent>
      </Card>
      <Card className="border-emerald-500">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-emerald-600">
            {stats.active_licenses}
          </div>
          <p className="text-sm text-slate-500">Activas</p>
        </CardContent>
      </Card>
      <Card className="border-amber-500">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-amber-600">
            {stats.expiring_soon_licenses}
          </div>
          <p className="text-sm text-slate-500">Por Vencer</p>
        </CardContent>
      </Card>
      <Card className="border-rose-500">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-rose-600">
            {stats.expired_licenses}
          </div>
          <p className="text-sm text-slate-500">Expiradas</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente de filtros
function Filters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por empresa, email, NIT o token..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">Todos los estados</option>
        <option value="active">Activas</option>
        <option value="expired">Expiradas</option>
        <option value="suspended">Suspendidas</option>
        <option value="cancelled">Canceladas</option>
      </select>
    </div>
  );
}

// Componente de estado badge
function StatusBadge({ status }: { status: string }) {
  const colors = {
    active: "bg-emerald-100 text-emerald-700",
    expired: "bg-rose-100 text-rose-700",
    suspended: "bg-amber-100 text-amber-700",
    cancelled: "bg-slate-100 text-slate-700",
  };

  const labels = {
    active: "Activa",
    expired: "Expirada",
    suspended: "Suspendida",
    cancelled: "Cancelada",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}
    >
      {labels[status as keyof typeof labels]}
    </span>
  );
}

// Componente de tabla de licencias
function LicenseTable({
  licenses,
  onEdit,
  onToggle,
  onDelete,
  onRenew,
  onView,
}: {
  licenses: LicenseToken[];
  onEdit: (l: LicenseToken) => void;
  onToggle: (l: LicenseToken) => void;
  onDelete: (l: LicenseToken) => void;
  onRenew: (l: LicenseToken) => void;
  onView: (l: LicenseToken) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-600">
              Empresa
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-600">
              Plan
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-600">
              Estado
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-600">
              Expira
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-600">
              Días
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-600">
              Token
            </th>
            <th className="text-right py-3 px-4 font-semibold text-slate-600">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {licenses.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-slate-500">
                No se encontraron licencias
              </td>
            </tr>
          ) : (
            licenses.map((license) => (
              <motion.tr
                key={license.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="py-3 px-4">
                  <div className="font-medium">{license.company_name}</div>
                  <div className="text-sm text-slate-500">
                    {license.company_email}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">{license.plan?.name}</span>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={license.status} />
                </td>
                <td className="py-3 px-4 text-sm">
                  {formatDate(license.expires_at)}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={
                      license.is_expiring_soon
                        ? "text-amber-600 font-medium"
                        : ""
                    }
                  >
                    {license.days_remaining}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                    {license.token.slice(0, 12)}...
                  </code>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onView(license)}
                      className="p-1 hover:bg-slate-100 rounded"
                      title="Ver"
                    >
                      <Eye className="w-4 h-4 text-slate-500" />
                    </button>
                    <button
                      onClick={() => onEdit(license)}
                      className="p-1 hover:bg-slate-100 rounded"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                      onClick={() => onRenew(license)}
                      className="p-1 hover:bg-slate-100 rounded"
                      title="Renovar"
                    >
                      <RefreshCw className="w-4 h-4 text-emerald-500" />
                    </button>
                    <button
                      onClick={() => onToggle(license)}
                      className="p-1 hover:bg-slate-100 rounded"
                      title={license.is_active ? "Suspender" : "Activar"}
                    >
                      {license.is_active ? (
                        <ToggleRight className="w-4 h-4 text-amber-500" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-emerald-500" />
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(license)}
                      className="p-1 hover:bg-slate-100 rounded"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-rose-500" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Modal para crear/editar licencia
function LicenseModal({
  license,
  plans,
  onClose,
  onSave,
}: {
  license: LicenseToken | null;
  plans: SubscriptionPlan[];
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const isEdit = !!license;
  const [formData, setFormData] = useState({
    company_name: license?.company_name || "",
    company_email: license?.company_email || "",
    company_nit: license?.company_nit || "",
    plan_id: license?.plan_id || plans[0]?.id || 1,
    starts_at:
      license?.starts_at?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
    expires_at: license?.expires_at?.split("T")[0] || "",
    payment_method: license?.payment?.method || "",
    amount_paid: license?.payment?.amount || 0,
    currency: license?.payment?.currency || "COP",
    transaction_id: license?.payment?.transaction_id || "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Editar Licencia" : "Nueva Licencia"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Empresa *</label>
            <input
              type="text"
              required
              value={formData.company_name}
              onChange={(e) =>
                setFormData({ ...formData, company_name: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.company_email}
                onChange={(e) =>
                  setFormData({ ...formData, company_email: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">NIT</label>
              <input
                type="text"
                value={formData.company_nit}
                onChange={(e) =>
                  setFormData({ ...formData, company_nit: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Plan *</label>
            <select
              required
              value={formData.plan_id}
              onChange={(e) =>
                setFormData({ ...formData, plan_id: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - {formatPriceCop(plan.price_cop)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Inicio *</label>
              <input
                type="date"
                required
                value={formData.starts_at}
                onChange={(e) =>
                  setFormData({ ...formData, starts_at: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiración *
              </label>
              <input
                type="date"
                required
                value={formData.expires_at}
                onChange={(e) =>
                  setFormData({ ...formData, expires_at: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Método</label>
              <select
                value={formData.payment_method}
                onChange={(e) =>
                  setFormData({ ...formData, payment_method: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar</option>
                <option value="mercadopago">MercadoPago</option>
                <option value="stripe">Stripe</option>
                <option value="transferencia">Transferencia</option>
                <option value="efectivo">Efectivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monto</label>
              <input
                type="number"
                value={formData.amount_paid}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount_paid: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Moneda</label>
              <select
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="COP">COP</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction ID
            </label>
            <input
              type="text"
              value={formData.transaction_id}
              onChange={(e) =>
                setFormData({ ...formData, transaction_id: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {isEdit ? "Guardar Cambios" : "Crear Licencia"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal para ver detalles de licencia
function ViewLicenseModal({
  license,
  onClose,
}: {
  license: LicenseToken;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Detalles de Licencia</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Empresa</p>
              <p className="font-medium">{license.company_name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium">{license.company_email || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">NIT</p>
              <p className="font-medium">{license.company_nit || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Plan</p>
              <p className="font-medium">{license.plan?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Estado</p>
              <StatusBadge status={license.status} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Días restantes</p>
              <p
                className={`font-medium ${license.is_expiring_soon ? "text-amber-600" : ""}`}
              >
                {license.days_remaining}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Inicio</p>
              <p className="font-medium">{formatDate(license.starts_at)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Expiración</p>
              <p className="font-medium">{formatDate(license.expires_at)}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-1">Token</p>
            <code className="block p-2 bg-slate-100 rounded text-xs break-all">
              {license.token}
            </code>
          </div>

          {license.payment && (
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Información de Pago</p>
              <p className="text-sm">
                {license.payment.method} - {license.payment.formatted_amount}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <Button onClick={onClose} className="w-full">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

// Componente principal del panel de licencias
export function AdminLicenses() {
  const store = useLicenseStore();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingLicense, setEditingLicense] = useState<LicenseToken | null>(
    null,
  );
  const [viewingLicense, setViewingLicense] = useState<LicenseToken | null>(
    null,
  );

  const loadData = async () => {
    store.setLoading(true);
    store.setError(null);

    try {
      const [licensesRes, statsRes, plansRes] = await Promise.all([
        fetchLicenses(
          store.currentPage,
          15,
          store.statusFilter,
          store.searchQuery,
        ),
        fetchLicenseStats(),
        fetchPlansFromAdmin(),
      ]);

      if (licensesRes) {
        store.setLicenses(licensesRes.data);
        store.setCurrentPage(licensesRes.meta.current_page);
        store.setTotalPages(licensesRes.meta.last_page);
        store.setTotal(licensesRes.meta.total);
      }

      if (statsRes) store.setStats(statsRes);
      if (plansRes) store.setPlans(plansRes);
    } catch (err) {
      store.setError("Error al cargar datos");
    } finally {
      store.setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [store.currentPage, store.statusFilter, store.searchQuery]);

  const handleCreate = () => {
    setEditingLicense(null);
    setShowModal(true);
  };

  const handleEdit = (license: LicenseToken) => {
    setEditingLicense(license);
    setShowModal(true);
  };

  const handleView = (license: LicenseToken) => {
    setViewingLicense(license);
    setShowViewModal(true);
  };

  const handleSave = async (data: any) => {
    if (editingLicense) {
      await updateLicense(editingLicense.id, data);
    } else {
      await createLicense(data);
    }
    setShowModal(false);
    loadData();
  };

  const handleToggle = async (license: LicenseToken) => {
    await toggleLicense(license.id);
    loadData();
  };

  const handleDelete = async (license: LicenseToken) => {
    if (confirm(`¿Eliminar licencia de ${license.company_name}?`)) {
      await deleteLicense(license.id);
      loadData();
    }
  };

  const handleRenew = async (license: LicenseToken) => {
    const days = prompt("Días a renovar:", "30");
    if (days && Number(days) > 0) {
      await renewLicense(license.id, Number(days));
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Gestión de Licencias
            </h1>
            <p className="text-slate-500">
              Administra las licencias de tus clientes
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Licencia
          </Button>
        </div>

        <StatsCards stats={store.stats} />

        <Filters
          search={store.searchQuery}
          onSearchChange={store.setSearchQuery}
          status={store.statusFilter}
          onStatusChange={store.setStatusFilter}
        />

        {store.loading ? (
          <div className="text-center py-8 text-slate-500">Cargando...</div>
        ) : store.error ? (
          <div className="text-center py-8 text-rose-500">{store.error}</div>
        ) : (
          <>
            <LicenseTable
              licenses={store.licenses}
              onEdit={handleEdit}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onRenew={handleRenew}
              onView={handleView}
            />

            {store.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: store.totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => store.setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        page === store.currentPage
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-slate-200"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
            )}
          </>
        )}
      </div>

      {showModal && (
        <LicenseModal
          license={editingLicense}
          plans={store.plans}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {showViewModal && viewingLicense && (
        <ViewLicenseModal
          license={viewingLicense}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </div>
  );
}
