import type { PresupuestoState, RfCategory, RfItem, Tag } from "./types";

export const PRESUPUESTO_STORAGE_KEY = "rf-presupuesto";

export function createDefaultPresupuestoState(): PresupuestoState {
  let uid = 0;
  const nextId = () => ++uid;
  const item = (name: string, value = 0, tag?: Tag): RfItem => ({ id: nextId(), name, value, tag });
  const cat = (
    title: string,
    icon: RfCategory["icon"],
    open: boolean,
    items: RfItem[],
    extra?: { note?: string; excludeTag?: boolean }
  ): RfCategory => ({
    id: nextId(),
    title,
    icon,
    open,
    items,
    ...extra,
  });

  return {
    ingresos: [
      cat(
        "Ingreso activo",
        "briefcase",
        true,
        [item("Salario"), item("Auxilios y prima"), item("Honorarios"), item("Negocio adicional")],
        { excludeTag: true }
      ),
      cat(
        "Ingreso pasivo",
        "chart",
        false,
        [item("Fondos de inversión"), item("Rentas"), item("Intereses"), item("Pensión"), item("Dividendos")],
        {
          excludeTag: true,
          note: "También llamado ingreso semi-pasivo o de esfuerzo variable: no requiere tu presencia constante para generarse, aunque sí exige que lo entiendas y lo supervises de vez en cuando — por ejemplo un arriendo, el dividendo de una empresa o el interés de una inversión.",
        }
      ),
    ],
    egresos: [
      cat("Hogar", "home", true, [
        item("Hipoteca / Arriendo", 0, "necesidad"),
        item("Servicios públicos", 0, "necesidad"),
        item("Internet / TV / Teléfono", 0, "necesidad"),
        item("Administración", 0, "necesidad"),
        item("Colegio", 0, "necesidad"),
      ]),
      cat("Mercado", "box", false, [
        item("Alimentación", 0, "necesidad"),
        item("Artículos de uso personal", 0, "necesidad"),
      ]),
      cat("Vehículo", "car", false, [
        item("Cuota crédito vehicular", 0, "deseo"),
        item("Gasolina", 0, "necesidad"),
        item("Mantenimiento", 0, "necesidad"),
        item("Seguros", 0, "necesidad"),
        item("Parqueaderos y peajes", 0, "deseo"),
      ]),
      cat("Transporte", "car", false, [item("Taxi / apps de transporte", 0, "deseo"), item("Otros", 0, "deseo")]),
      cat("Salud", "heart", false, [item("Medicamentos", 0, "necesidad"), item("Póliza o plan de salud", 0, "necesidad")]),
      cat("Obligaciones financieras", "card", false, [item("Hipoteca (cuota mensual)", 0, "necesidad")], {
        note: "Un compromiso que pensaste con anticipación y que sí tienes capacidad de cubrir dentro de tu presupuesto mensual — como la cuota de una hipoteca tras una decisión analizada.",
      }),
      cat("Deudas", "card", false, [item("Cuota de crédito o tarjeta", 0, "necesidad")], {
        note: "Algo que adquiriste de forma emocional o por desconocimiento, y para lo cual no tienes un presupuesto mensual que lo cubra sin hacer malabares.",
      }),
      cat("Otros servicios", "box", false, [item("Lavandería", 0, "deseo"), item("Servicio de limpieza", 0, "deseo")]),
      cat("Otras actividades", "chart", false, [item("Gimnasio", 0, "deseo"), item("Deportes / clubs", 0, "deseo")]),
      cat("Entretenimiento", "box", false, [
        item("Restaurantes", 0, "deseo"),
        item("Suscripciones", 0, "deseo"),
        item("Salidas (cine, conciertos)", 0, "deseo"),
      ]),
      cat("Educación", "book", false, [item("Cursos / seminarios", 0, "deseo"), item("Materiales / libros", 0, "deseo")]),
      cat("Personal", "box", false, [
        item("Ropa y calzado", 0, "necesidad"),
        item("Belleza", 0, "deseo"),
        item("Servicio celular", 0, "necesidad"),
      ]),
      cat("Impuestos y contribuciones", "briefcase", false, [
        item("Seguridad social", 0, "necesidad"),
        item("Pensión / caja de compensación", 0, "necesidad"),
      ]),
      cat("Dar", "heart", false, [item("Diezmo"), item("Ofrenda"), item("Regalos")], { excludeTag: true }),
      cat("Dinero de bolsillo", "money", false, [item("Caja menor", 0, "deseo")]),
      cat("Otros", "box", false, [item("Imprevistos", 0, "necesidad")]),
    ],
    completedAt: null,
    flujo: null,
  };
}

export function categoryTotal(cat: RfCategory): number {
  return cat.items.reduce((s, i) => s + (i.value || 0), 0);
}

export function panelTotal(data: RfCategory[]): number {
  return data.reduce((s, c) => s + categoryTotal(c), 0);
}

export function totalByTag(egresos: RfCategory[], tag: Tag): number {
  return egresos
    .filter((cat) => !cat.excludeTag)
    .reduce((sum, cat) => sum + cat.items.filter((i) => i.tag === tag).reduce((s, i) => s + (i.value || 0), 0), 0);
}
