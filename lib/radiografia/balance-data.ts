import type { BalanceState, RfCategory, RfItem } from "./types";

export const BALANCE_STORAGE_KEY = "rf-balance";

export function createDefaultBalanceState(): BalanceState {
  let uid = 0;
  const nextId = () => ++uid;
  const item = (name: string, value = 0): RfItem => ({ id: nextId(), name, value });
  const cat = (title: string, icon: RfCategory["icon"], open: boolean, items: RfItem[]): RfCategory => ({
    id: nextId(),
    title,
    icon,
    open,
    items,
  });

  return {
    activos: [
      cat("Dinero y ahorros", "money", true, [item("Efectivo"), item("Cuentas bancarias"), item("Cesantías / CDT")]),
      cat("Propiedades", "home", false, [item("Casa o apartamento")]),
      cat("Vehículos", "car", false, [item("Carro / moto")]),
      cat("Inversiones", "chart", false, [item("Acciones / fondos")]),
      cat("Negocios", "briefcase", false, [item("Participación en negocio propio")]),
      cat("Otros activos", "box", false, [item("Electrodomésticos, equipos, joyas")]),
      cat("Cuentas por cobrar", "money", false, [item("Dinero que me deben")]),
    ],
    pasivos: [
      cat("Hipoteca", "home", true, [item("Hipoteca vivienda")]),
      cat("Créditos de libre inversión", "money", false, [item("Crédito rotativo / libre inversión")]),
      cat("Créditos vehiculares", "car", false, [item("Crédito vehículo")]),
      cat("Tarjetas de crédito", "card", false, [item("Tarjeta de crédito")]),
      cat("Créditos en tiendas y almacenes", "box", false, [item("Crédito almacén")]),
      cat("Créditos educativos", "book", false, [item("Crédito educativo")]),
      cat("Otros créditos", "box", false, [item("Otro crédito u obligación")]),
      cat("Fianzas y codeudas", "book", false, [item("Obligación como codeudor o fiador")]),
    ],
    completedAt: null,
  };
}

export function categoryTotal(cat: RfCategory): number {
  return cat.items.reduce((s, i) => s + (i.value || 0), 0);
}

export function panelTotal(data: RfCategory[]): number {
  return data.reduce((s, c) => s + categoryTotal(c), 0);
}
