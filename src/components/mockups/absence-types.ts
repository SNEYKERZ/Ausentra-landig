export type AbsenceType = "vac" | "perm" | "lic" | "inc";

export const ABSENCE_TYPES: Record<AbsenceType, { label: string; bar: string; dot: string }> = {
  vac: { label: "Vacaciones", bar: "bg-vac-soft text-brand-800 ring-vac/30", dot: "bg-vac" },
  perm: { label: "Permiso", bar: "bg-perm-soft text-[oklch(0.42_0.1_60)] ring-perm/35", dot: "bg-perm" },
  lic: { label: "Licencia", bar: "bg-lic-soft text-[oklch(0.38_0.09_165)] ring-lic/35", dot: "bg-lic" },
  inc: { label: "Incapacidad", bar: "bg-inc-soft text-[oklch(0.42_0.14_15)] ring-inc/35", dot: "bg-inc" },
};
