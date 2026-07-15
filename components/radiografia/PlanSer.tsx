"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { formatCOP, parseCOPInput } from "@/lib/radiografia/format";
import { CAJAS_DEFAULT } from "@/lib/radiografia/mayordomia-data";
import { PLAN_SER_STORAGE_KEY, createDefaultPlanSerState, listTotal } from "@/lib/radiografia/plan-ser-data";
import { PRESUPUESTO_STORAGE_KEY, createDefaultPresupuestoState } from "@/lib/radiografia/presupuesto-data";
import { useLocalStorageState } from "@/lib/radiografia/useLocalStorageState";

let clientUid = 300000;
const nextClientId = () => ++clientUid;

type SerKey = "simplificar" | "eliminar" | "reducir";

const SECTIONS: { key: SerKey; title: string; desc: string; placeholder: string }[] = [
  { key: "simplificar", title: "Simplificar", desc: "Paga menos por lo mismo. El mismo valor, menor costo.", placeholder: "simplificar" },
  { key: "eliminar", title: "Eliminar", desc: "Quita lo que no te aporta ningún valor real.", placeholder: "eliminar" },
  { key: "reducir", title: "Reducir", desc: "Ajusta lo que sí necesitas y deseas — sin culpa, con intención.", placeholder: "reducir" },
];

export default function PlanSer() {
  const router = useRouter();
  const [presupuesto, , presupuestoHydrated] = useLocalStorageState(PRESUPUESTO_STORAGE_KEY, createDefaultPresupuestoState());
  const [state, setState, hydrated] = useLocalStorageState(PLAN_SER_STORAGE_KEY, createDefaultPlanSerState());

  const esDeficit = (presupuesto.flujo ?? 0) < 0;

  useEffect(() => {
    if (!presupuestoHydrated) return;
    if (!presupuesto.completedAt) {
      router.replace("/radiografia-financiera/presupuesto");
    } else if (!esDeficit) {
      router.replace("/radiografia-financiera/mayordomia");
    }
  }, [presupuestoHydrated, presupuesto.completedAt, esDeficit, router]);

  function updateItemName(key: SerKey, itemId: number, name: string) {
    setState((prev) => ({
      ...prev,
      [key]: prev[key].map((i) => (i.id === itemId ? { ...i, name } : i)),
    }));
  }

  function updateItemValue(key: SerKey, itemId: number, raw: string) {
    const value = parseCOPInput(raw);
    setState((prev) => ({
      ...prev,
      [key]: prev[key].map((i) => (i.id === itemId ? { ...i, value } : i)),
    }));
  }

  function addItem(key: SerKey) {
    setState((prev) => ({
      ...prev,
      [key]: [...prev[key], { id: nextClientId(), name: "", value: 0 }],
    }));
  }

  function removeItem(key: SerKey, itemId: number) {
    setState((prev) => ({
      ...prev,
      [key]: prev[key].filter((i) => i.id !== itemId),
    }));
  }

  function updateCajaPct(id: string, raw: string) {
    let val = parseInt((raw || "0").replace(/[^0-9]/g, ""), 10);
    if (isNaN(val)) val = 0;
    if (val > 100) val = 100;
    setState((prev) => ({
      ...prev,
      cajas: prev.cajas.map((c) => (c.id === id ? { ...c, pct: val } : c)),
    }));
  }

  const totS = listTotal(state.simplificar);
  const totE = listTotal(state.eliminar);
  const totR = listTotal(state.reducir);
  const totalLiberado = totS + totE + totR;

  if (!hydrated || !presupuestoHydrated || !presupuesto.completedAt || !esDeficit) {
    return <div className="rf-shell" style={{ minHeight: "60vh" }} />;
  }

  return (
    <div className="rf-shell">
      <div className="hero">
        <div className="scanline" />
        <div className="hero-inner">
          <div className="eyebrow">Módulo 5 · Herramientas para una buena administración</div>
          <h1>
            Plan <em>SER</em>
          </h1>
          <p className="lede">
            Tu Presupuesto Mensual mostró déficit. Este no es el final del camino — es donde empieza tu plan de
            acción. Escribe, concepto por concepto, qué vas a Simplificar, Eliminar y Reducir.
          </p>

          <div className="stepper">
            <div className="step done">
              <div className="step-num">✓</div>
              <div>
                <div className="step-label">Balance General</div>
                <div className="step-sub">Completado</div>
              </div>
            </div>
            <div className="step done">
              <div className="step-num">✓</div>
              <div>
                <div className="step-label">Presupuesto Mensual</div>
                <div className="step-sub">Completado</div>
              </div>
            </div>
            <div className="step active">
              <div className="step-num">3</div>
              <div>
                <div className="step-label">Plan SER</div>
                <div className="step-sub">Tu camino de salida</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="intro">
          <div className="intro-mark">SER · un plan, no una sentencia</div>
          <p>
            Recuerda: <strong>protegemos siempre tu Calidad de Vida</strong> — lo esencial. El Plan SER trabaja
            sobre tu Estilo de Vida, los gastos marcados como &quot;Deseo&quot; en tu Presupuesto Mensual. Ahí es
            donde tienes margen real para maniobrar.
          </p>
        </div>

        <div className="ser-verse">
          <p className="ser-verse-text">
            &ldquo;Pues Dios no nos ha dado un espíritu de temor y timidez sino de poder, amor y
            autodisciplina.&rdquo;
          </p>
          <p className="ser-verse-ref">2 Timoteo 1:7 (NTV)</p>
          <p className="ser-verse-close">
            No es fuerza de voluntad sola — es el mismo Espíritu que te da poder y amor el que también te da la
            autodisciplina para hacer estos ajustes, un paso diligente a la vez.
          </p>
        </div>

        {SECTIONS.map((section) => {
          const total = section.key === "simplificar" ? totS : section.key === "eliminar" ? totE : totR;
          return (
            <div className="ser-section" key={section.key}>
              <div className="ser-section-head">
                <span className="ser-section-title">{section.title}</span>
                <span className="ser-section-total">{formatCOP(total)} / mes</span>
              </div>
              <p className="ser-section-desc">{section.desc}</p>
              <div>
                {state[section.key].map((item) => (
                  <div className="ser-row" key={item.id}>
                    <input
                      type="text"
                      value={item.name}
                      placeholder={`¿Qué vas a ${section.placeholder}?`}
                      onChange={(e) => updateItemName(section.key, item.id, e.target.value)}
                    />
                    <div className="value-field">
                      <span>$</span>
                      <input
                        type="text"
                        className="value-input"
                        inputMode="numeric"
                        placeholder="0 / mes"
                        value={item.value ? item.value.toLocaleString("es-CO") : ""}
                        onChange={(e) => updateItemValue(section.key, item.id, e.target.value)}
                      />
                    </div>
                    <button className="ser-del" title="Eliminar" onClick={() => removeItem(section.key, item.id)}>
                      ×
                    </button>
                  </div>
                ))}
                <button className="ser-add" onClick={() => addItem(section.key)}>
                  + Agregar
                </button>
              </div>
            </div>
          );
        })}

        <div className="total-liberado">
          <div>
            <div className="tl-label">Total que puedes liberar cada mes</div>
            <div className="tl-val">{formatCOP(totalLiberado)}</div>
          </div>
          <div className="tl-note">Este número es tu meta de diligencia — no tiene que salir perfecto la primera vez.</div>
        </div>

        <div className="preview-head">
          <span className="preview-tag">Vista previa</span>
          <h2>Así puedes dirigir lo que liberes</h2>
          <p>
            Con la ayuda del Espíritu Santo y diligencia, esto es lo que podrías hacer con ese dinero cada mes
            usando el Sistema de Mayordomía Financiera. Ajusta los porcentajes como quieras.
          </p>
        </div>

        <div className="cajas-grid">
          {CAJAS_DEFAULT.map((meta) => {
            const caja = state.cajas.find((c) => c.id === meta.id)!;
            return (
              <div className="caja" key={meta.id}>
                <div className="caja-name">{meta.name}</div>
                <div className="caja-controls">
                  <div className="pct-field">
                    <input type="text" inputMode="numeric" value={caja.pct} onChange={(e) => updateCajaPct(meta.id, e.target.value)} />
                    <span>%</span>
                  </div>
                  <span className="caja-amount">{formatCOP((totalLiberado * caja.pct) / 100)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="closing-card">
          <p>
            Un plan escrito con la ayuda de Dios y trabajado con diligencia vale más que una meta perfecta que
            nunca empieza. <strong>Empieza este mes con un solo ajuste si es necesario</strong> — la constancia es
            lo que transforma tus finanzas.
          </p>
        </div>
      </div>

      <style jsx>{`
        .rf-shell {
          --navy: #001527;
          --navy-soft: #0b2438;
          --navy-card: #0f2c42;
          --gold: #bd8b40;
          --gold-light: #c9a227;
          --forest: #0a3428;
          --sage: #6fa184;
          --cream: #f4f2ef;
          --line: rgba(244, 242, 239, 0.12);
          --text-dim: rgba(244, 242, 239, 0.62);
          --warn: #d9a05b;

          background: var(--navy);
          color: var(--cream);
          font-family: "Montserrat", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .rf-shell :global(*) {
          box-sizing: border-box;
        }
        .wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .hero {
          position: relative;
          padding: 56px 24px 40px;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          margin-bottom: 40px;
        }
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, rgba(201, 162, 39, 0.05) 28px);
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black, transparent 85%);
        }
        .hero-inner {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
        }
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-light);
          font-weight: 600;
          margin-bottom: 18px;
        }
        .eyebrow::before {
          content: "";
          width: 22px;
          height: 1px;
          background: var(--gold-light);
        }
        .rf-shell :global(h1) {
          font-family: "Lora", serif;
          font-weight: 500;
          font-size: clamp(32px, 4.6vw, 52px);
          line-height: 1.08;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }
        .rf-shell :global(h1 em) {
          color: var(--gold-light);
          font-style: italic;
        }
        .lede {
          font-size: 16px;
          line-height: 1.65;
          color: var(--text-dim);
          max-width: 620px;
          margin: 0 0 8px;
        }

        .stepper {
          display: flex;
          gap: 8px;
          margin-top: 36px;
          flex-wrap: wrap;
        }
        .step {
          flex: 1;
          min-width: 200px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: var(--navy-soft);
        }
        .step.active {
          border-color: var(--gold);
          background: linear-gradient(135deg, rgba(189, 139, 64, 0.14), rgba(11, 36, 56, 0.4));
        }
        .step.done {
          border-color: rgba(111, 161, 132, 0.5);
        }
        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
          background: var(--navy-card);
          color: var(--text-dim);
        }
        .step.active .step-num {
          background: var(--gold);
          color: var(--navy);
        }
        .step.done .step-num {
          background: var(--sage);
          color: var(--navy);
        }
        .step-label {
          font-size: 13px;
          font-weight: 600;
        }
        .step-sub {
          font-size: 11px;
          color: var(--text-dim);
          margin-top: 1px;
        }

        .intro {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          padding: 22px 24px;
          margin-bottom: 28px;
          background: var(--navy-soft);
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .intro-mark {
          font-family: "Lora", serif;
          font-style: italic;
          color: var(--gold-light);
          font-size: 13px;
          letter-spacing: 0.02em;
          white-space: nowrap;
          padding-top: 2px;
        }
        .intro :global(p) {
          margin: 0;
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--text-dim);
        }
        .intro :global(strong) {
          color: var(--cream);
          font-weight: 600;
        }

        .ser-verse {
          text-align: center;
          padding: 22px 20px;
          margin-bottom: 28px;
          border-radius: 10px;
          background: linear-gradient(160deg, rgba(10, 52, 40, 0.4), rgba(0, 21, 39, 0.3));
          border: 1px solid var(--line);
        }
        .ser-verse-text {
          font-family: "Lora", serif;
          font-style: italic;
          font-weight: 500;
          font-size: 17px;
          color: var(--cream);
          margin: 0 0 6px;
          max-width: 460px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }
        .ser-verse-ref {
          font-size: 11.5px;
          color: var(--gold-light);
          font-weight: 600;
          letter-spacing: 0.05em;
          margin: 0 0 14px;
        }
        .ser-verse-close {
          font-size: 12.5px;
          color: var(--text-dim);
          margin: 0;
          font-style: italic;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }

        .ser-section {
          margin-bottom: 22px;
          padding: 22px 24px;
          border-radius: 12px;
          background: var(--navy-card);
          border: 1px solid var(--line);
        }
        .ser-section-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 6px;
          flex-wrap: wrap;
          gap: 6px;
        }
        .ser-section-title {
          font-family: "Lora", serif;
          font-size: 19px;
          font-weight: 600;
          color: var(--gold-light);
        }
        .ser-section-total {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--sage);
          font-variant-numeric: tabular-nums;
        }
        .ser-section-desc {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .ser-row {
          display: grid;
          grid-template-columns: 1fr 150px 30px;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
        }
        @media (max-width: 560px) {
          .ser-row {
            grid-template-columns: 1fr;
          }
        }
        .ser-row input[type="text"] {
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 10px 12px;
          color: var(--cream);
          font-family: "Montserrat", sans-serif;
          font-size: 13.5px;
          width: 100%;
        }
        .ser-row .value-field {
          display: flex;
          align-items: center;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 0 10px;
        }
        .value-field span {
          font-size: 13px;
          color: var(--text-dim);
          margin-right: 2px;
        }
        .ser-row input[type="text"].value-input {
          border: none;
          padding: 10px 0;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .ser-row input:focus {
          outline: none;
          border-color: var(--gold);
        }
        .ser-row .value-field:focus-within {
          border-color: var(--gold);
        }
        .ser-del {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--text-dim);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          transition: 0.15s;
        }
        .ser-del:hover {
          border-color: #c0625a;
          color: #c0625a;
        }
        .ser-add {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px dashed var(--line);
          border-radius: 7px;
          padding: 9px 14px;
          color: var(--gold-light);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          margin-top: 4px;
          font-family: "Montserrat", sans-serif;
        }
        .ser-add:hover {
          border-color: var(--gold-light);
          background: rgba(201, 162, 39, 0.06);
        }

        .total-liberado {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          padding: 24px 26px;
          margin: 8px 0 36px;
          border-radius: 12px;
          background: linear-gradient(160deg, rgba(10, 52, 40, 0.45), rgba(11, 36, 56, 0.4));
          border: 1px solid rgba(111, 161, 132, 0.4);
        }
        .tl-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-dim);
          font-weight: 600;
          margin-bottom: 6px;
        }
        .tl-val {
          font-family: "Lora", serif;
          font-size: 32px;
          font-weight: 600;
          color: var(--sage);
          font-variant-numeric: tabular-nums;
        }
        .tl-note {
          font-size: 12.5px;
          color: var(--text-dim);
          max-width: 320px;
          line-height: 1.6;
        }

        .preview-head {
          margin-bottom: 16px;
        }
        .preview-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold-light);
        }
        .preview-head :global(h2) {
          font-family: "Lora", serif;
          font-weight: 500;
          font-size: 22px;
          margin: 8px 0 6px;
          color: var(--cream);
        }
        .preview-head :global(p) {
          margin: 0;
          font-size: 13.5px;
          color: var(--text-dim);
          line-height: 1.6;
          max-width: 600px;
        }

        .cajas-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 20px 0;
        }
        @media (max-width: 700px) {
          .cajas-grid {
            grid-template-columns: 1fr;
          }
        }
        .caja {
          padding: 20px;
          border-radius: 12px;
          background: var(--navy-card);
          border: 1px solid var(--line);
        }
        .caja-name {
          font-family: "Lora", serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--gold-light);
          margin-bottom: 8px;
        }
        .caja-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pct-field {
          display: flex;
          align-items: center;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 0 10px;
          width: 78px;
        }
        .pct-field input {
          border: none;
          background: transparent;
          padding: 9px 0;
          text-align: right;
          color: var(--cream);
          font-size: 14px;
          width: 38px;
          font-variant-numeric: tabular-nums;
        }
        .pct-field input:focus {
          outline: none;
        }
        .pct-field span {
          font-size: 13px;
          color: var(--text-dim);
        }
        .caja-amount {
          margin-left: auto;
          font-size: 15px;
          font-weight: 600;
          color: var(--sage);
          font-variant-numeric: tabular-nums;
        }

        .closing-card {
          padding: 26px 28px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: var(--navy-soft);
          text-align: center;
          margin-top: 8px;
        }
        .closing-card :global(p) {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-dim);
          max-width: 580px;
          margin: 0 auto;
        }
        .closing-card :global(strong) {
          color: var(--cream);
        }
      `}</style>
    </div>
  );
}
