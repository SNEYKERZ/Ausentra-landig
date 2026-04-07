import { create } from "zustand";
import type { LicenseToken, LicenseStats, SubscriptionPlan } from "@/types";

interface LicenseStore {
  // Data
  licenses: LicenseToken[];
  stats: LicenseStats | null;
  plans: SubscriptionPlan[];

  // Pagination
  currentPage: number;
  totalPages: number;
  total: number;

  // Filters
  statusFilter: string;
  searchQuery: string;

  // UI State
  loading: boolean;
  error: string | null;
  selectedLicense: LicenseToken | null;

  // Actions
  setLicenses: (licenses: LicenseToken[]) => void;
  setStats: (stats: LicenseStats | null) => void;
  setPlans: (plans: SubscriptionPlan[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setTotal: (total: number) => void;
  setStatusFilter: (status: string) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedLicense: (license: LicenseToken | null) => void;

  // Helpers
  clearFilters: () => void;
}

export const useLicenseStore = create<LicenseStore>((set) => ({
  // Initial state
  licenses: [],
  stats: null,
  plans: [],
  currentPage: 1,
  totalPages: 1,
  total: 0,
  statusFilter: "all",
  searchQuery: "",
  loading: false,
  error: null,
  selectedLicense: null,

  // Actions
  setLicenses: (licenses) => set({ licenses }),
  setStats: (stats) => set({ stats }),
  setPlans: (plans) => set({ plans }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  setTotal: (total) => set({ total }),
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedLicense: (license) => set({ selectedLicense: license }),
  clearFilters: () =>
    set({ statusFilter: "all", searchQuery: "", currentPage: 1 }),
}));
