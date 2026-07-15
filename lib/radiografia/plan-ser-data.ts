import { CAJAS_DEFAULT } from "./mayordomia-data";
import type { CajaPct, PlanSerState, SerItem } from "./types";

export const PLAN_SER_STORAGE_KEY = "rf-plan-ser";

export function createDefaultPlanSerState(): PlanSerState {
  let uid = 0;
  const nextId = () => ++uid;
  const empty = (): SerItem => ({ id: nextId(), name: "", value: 0 });

  return {
    simplificar: [empty()],
    eliminar: [empty()],
    reducir: [empty()],
    cajas: CAJAS_DEFAULT.map((c): CajaPct => ({ id: c.id, pct: c.pct })),
  };
}

export function listTotal(list: SerItem[]): number {
  return list.reduce((s, i) => s + (i.value || 0), 0);
}
