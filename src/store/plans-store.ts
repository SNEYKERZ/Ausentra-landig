import { create } from 'zustand'
import type { SubscriptionPlan } from '@/types'

interface PlansStore {
  plans: SubscriptionPlan[]
  loading: boolean
  error: string | null
  selectedPlan: SubscriptionPlan | null
  paymentMethod: 'stripe' | 'mercadopago' | null
  setPlans: (plans: SubscriptionPlan[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSelectedPlan: (plan: SubscriptionPlan | null) => void
  setPaymentMethod: (method: 'stripe' | 'mercadopago' | null) => void
}

export const usePlansStore = create<PlansStore>((set) => ({
  plans: [],
  loading: false,
  error: null,
  selectedPlan: null,
  paymentMethod: null,
  setPlans: (plans) => set({ plans }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
}))