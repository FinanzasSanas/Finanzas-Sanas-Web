import type { CajaPct, MayordomiaState } from "./types";

export const MAYORDOMIA_STORAGE_KEY = "rf-mayordomia";

export const CAJAS_DEFAULT: { id: string; name: string; desc: string; pct: number }[] = [
  {
    id: "colchon",
    name: "Colchón de Seguridad",
    desc: "Refuerza tu presupuesto mensual para los meses donde los gastos varían más de lo previsto.",
    pct: 25,
  },
  {
    id: "invertir",
    name: "Invertir",
    desc: "Dinero que pones a trabajar — fondos, negocio, activos que producen más ingreso con el tiempo.",
    pct: 35,
  },
  {
    id: "imprevistos",
    name: "Imprevistos",
    desc: "Viajes, reparaciones, eventos — lo inesperado que sí puedes prever que va a pasar.",
    pct: 20,
  },
  {
    id: "educacion",
    name: "Educación",
    desc: "Cursos, seminarios, libros — inversión en tu propia capacidad de crear y multiplicar valor.",
    pct: 20,
  },
];

export function createDefaultMayordomiaState(): MayordomiaState {
  return {
    cajas: CAJAS_DEFAULT.map((c): CajaPct => ({ id: c.id, pct: c.pct })),
    flujoOverride: null,
  };
}
