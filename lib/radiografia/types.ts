export type IconKey = "money" | "home" | "car" | "chart" | "briefcase" | "box" | "card" | "book" | "heart";

export type Tag = "necesidad" | "deseo";

export interface RfItem {
  id: number;
  name: string;
  value: number;
  tag?: Tag;
}

export interface RfCategory {
  id: number;
  title: string;
  icon: IconKey;
  open: boolean;
  note?: string;
  excludeTag?: boolean;
  items: RfItem[];
}

export interface BalanceState {
  activos: RfCategory[];
  pasivos: RfCategory[];
  completedAt: string | null;
}

export interface PresupuestoState {
  ingresos: RfCategory[];
  egresos: RfCategory[];
  completedAt: string | null;
  flujo: number | null;
}

export interface CajaPct {
  id: string;
  pct: number;
}

export interface MayordomiaState {
  cajas: CajaPct[];
  flujoOverride: number | null;
}

export interface SerItem {
  id: number;
  name: string;
  value: number;
}

export interface PlanSerState {
  simplificar: SerItem[];
  eliminar: SerItem[];
  reducir: SerItem[];
  cajas: CajaPct[];
}
