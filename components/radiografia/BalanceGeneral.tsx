"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BALANCE_STORAGE_KEY, categoryTotal, createDefaultBalanceState, panelTotal } from "@/lib/radiografia/balance-data";
import { formatCOP, parseCOPInput } from "@/lib/radiografia/format";
import { CategoryIcon } from "@/lib/radiografia/icons";
import type { RfCategory } from "@/lib/radiografia/types";
import { useLocalStorageState } from "@/lib/radiografia/useLocalStorageState";

let clientUid = 100000;
const nextClientId = () => ++clientUid;

type PanelKey = "activos" | "pasivos";

export default function BalanceGeneral() {
  const router = useRouter();
  const [state, setState] = useLocalStorageState(BALANCE_STORAGE_KEY, createDefaultBalanceState());

  function updateCategory(panel: PanelKey, catId: number, updater: (cat: RfCategory) => RfCategory) {
    setState((prev) => ({
      ...prev,
      [panel]: prev[panel].map((c) => (c.id === catId ? updater(c) : c)),
    }));
  }

  function toggleCategory(panel: PanelKey, catId: number) {
    updateCategory(panel, catId, (c) => ({ ...c, open: !c.open }));
  }

  function updateItemName(panel: PanelKey, catId: number, itemId: number, name: string) {
    updateCategory(panel, catId, (c) => ({
      ...c,
      items: c.items.map((i) => (i.id === itemId ? { ...i, name } : i)),
    }));
  }

  function updateItemValue(panel: PanelKey, catId: number, itemId: number, raw: string) {
    const value = parseCOPInput(raw);
    updateCategory(panel, catId, (c) => ({
      ...c,
      items: c.items.map((i) => (i.id === itemId ? { ...i, value } : i)),
    }));
  }

  function addItem(panel: PanelKey, catId: number) {
    updateCategory(panel, catId, (c) => ({
      ...c,
      items: [...c.items, { id: nextClientId(), name: "", value: 0 }],
    }));
  }

  function removeItem(panel: PanelKey, catId: number, itemId: number) {
    updateCategory(panel, catId, (c) => ({
      ...c,
      items: c.items.filter((i) => i.id !== itemId),
    }));
  }

  const totalActivos = panelTotal(state.activos);
  const totalPasivos = panelTotal(state.pasivos);
  const patrimonio = totalActivos - totalPasivos;

  function handleContinue() {
    const next = { ...state, completedAt: new Date().toISOString() };
    setState(next);
    try {
      window.localStorage.setItem(BALANCE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota / privacy-mode errors
    }
    router.push("/radiografia-financiera/presupuesto");
  }

  return (
    <div className="rf-shell">
      <div className="hero">
        <div className="scanline" />
        <div className="hero-inner">
          <div className="eyebrow">Módulo 5 · Herramientas para una buena administración</div>
          <h1>
            Radiografía <em>Financiera</em>
          </h1>
          <p className="lede">
            Antes de construir un plan, necesitas ver con claridad dónde estás hoy. Desarrollar tu estado
            financiero es el punto de partida honesto — sin vergüenza, sin juicio. Solo un diagnóstico real para
            poder avanzar con sabiduría.
          </p>

          <div className="stepper">
            <div className="step active">
              <div className="step-num">1</div>
              <div>
                <div className="step-label">Balance General</div>
                <div className="step-sub">Activos, pasivos y patrimonio</div>
              </div>
            </div>
            <div className="step locked">
              <div className="step-num">2</div>
              <div>
                <div className="step-label">Presupuesto Mensual</div>
                <div className="step-sub">Flujo de efectivo</div>
              </div>
            </div>
            <div className="step locked">
              <div className="step-num">3</div>
              <div>
                <div className="step-label">Mayordomía Financiera</div>
                <div className="step-sub">Sistema de cajas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="intro">
          <div className="intro-mark">Kabash · someter</div>
          <p>
            En Génesis 1:28 Dios nos llama a <strong>sojuzgar</strong> — tomar lo que está desordenado y ponerlo en
            orden. Este primer bloque es exactamente eso: un inventario honesto de lo que tienes y lo que debes. No
            es un examen que apruebas o repruebas. Es el primer paso de un administrador fiel. Este es el primer
            paso de tu Estado Financiero completo: <strong>Balance General + Presupuesto Mensual</strong>.
          </p>
        </div>

        <div className="panels">
          <div>
            <div className="panel-head">
              <span className="panel-title activos">Activos</span>
              <span className="panel-total">{formatCOP(totalActivos)}</span>
            </div>
            <Panel
              data={state.activos}
              panel="activos"
              onToggle={toggleCategory}
              onItemName={updateItemName}
              onItemValue={updateItemValue}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          </div>

          <div>
            <div className="panel-head">
              <span className="panel-title pasivos">Pasivos</span>
              <span className="panel-total">{formatCOP(totalPasivos)}</span>
            </div>
            <Panel
              data={state.pasivos}
              panel="pasivos"
              onToggle={toggleCategory}
              onItemName={updateItemName}
              onItemValue={updateItemValue}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-head">
            <span className="concept-tag">Un concepto clave</span>
            <h3>Patrimonio no es lo mismo que Flujo Neto</h3>
          </div>
          <div className="concept-grid">
            <div className="concept-col">
              <div className="concept-label">Patrimonio</div>
              <p>
                Es una <strong>fotografía</strong>: lo que tienes menos lo que debes, en este momento exacto.
              </p>
            </div>
            <div className="concept-col">
              <div className="concept-label">Flujo Neto</div>
              <p>
                Es una <strong>película</strong>: cuánto te queda cada mes entre lo que entra y lo que sale — lo
                verás en el Bloque 2.
              </p>
            </div>
          </div>
          <p className="concept-note">
            {patrimonio < 0
              ? "Tu patrimonio hoy es negativo — y eso no define lo que Dios puede hacer contigo. Es tu punto de partida, no tu identidad. En el Bloque 2 descubrirás si tu flujo neto ya va en la dirección correcta."
              : "Tu patrimonio hoy es positivo. Recuerda: un buen patrimonio no reemplaza un flujo de caja saludable. En el Bloque 2 verás si lo estás cuidando mes a mes."}
          </p>
        </div>

        <div className="verse-card">
          <p className="verse-lede">
            No importa el número que acabas de ver: hoy comienza tu camino hacia la libertad financiera, guiado por
            el Espíritu Santo.
          </p>
          <p className="verse-text">&ldquo;Pues el Señor es el Espíritu, y donde está el Espíritu del Señor, allí hay libertad.&rdquo;</p>
          <p className="verse-ref">2 Corintios 3:17 (NTV)</p>
        </div>

        <div className="locked-note">
          🔒 <strong>Bloque 2: Presupuesto Mensual</strong> se desbloqueará después de guardar tu Balance General.
          Ahí descubrirás tu flujo de efectivo — el término más importante de todo tu diagnóstico.
        </div>

        <p className="footer-note">
          Tus datos se guardan solo en este dispositivo mientras trabajas en el taller. Nada se comparte ni se
          almacena fuera de este navegador.
        </p>
      </div>

      <div className="result-bar">
        <div className="result-inner">
          <div className="result-metric activos">
            <span className="label">Total Activos</span>
            <span className="val">{formatCOP(totalActivos)}</span>
          </div>
          <div className="divider" />
          <div className="result-metric pasivos">
            <span className="label">Total Pasivos</span>
            <span className="val">{formatCOP(totalPasivos)}</span>
          </div>
          <div className="result-patrimonio">
            <span className="label">Patrimonio Líquido</span>
            <span className={"val " + (patrimonio >= 0 ? "positive" : "negative")}>{formatCOP(patrimonio)}</span>
          </div>
          <button className="continue-btn" onClick={handleContinue}>
            Continuar a Bloque 2 →
          </button>
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
          padding: 0 24px 140px;
        }

        /* ---------- HERO ---------- */
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
          color: var(--sage);
          font-style: italic;
        }
        .lede {
          font-size: 16px;
          line-height: 1.65;
          color: var(--text-dim);
          max-width: 600px;
          margin: 0 0 8px;
        }

        /* ---------- STEPPER ---------- */
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
        .step.locked {
          opacity: 0.45;
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
        .step-label {
          font-size: 13px;
          font-weight: 600;
        }
        .step-sub {
          font-size: 11px;
          color: var(--text-dim);
          margin-top: 1px;
        }

        /* ---------- INTRO ---------- */
        .intro {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          padding: 22px 24px;
          margin-bottom: 36px;
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

        /* ---------- PANELS ---------- */
        .panels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 820px) {
          .panels {
            grid-template-columns: 1fr;
          }
        }

        .panel-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
        }
        .panel-title {
          font-family: "Lora", serif;
          font-size: 22px;
          font-weight: 500;
        }
        .panel-title.activos {
          color: var(--sage);
        }
        .panel-title.pasivos {
          color: var(--gold-light);
        }
        .panel-total {
          font-size: 15px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        /* ---------- CONCEPT CARD ---------- */
        .concept-card {
          margin-top: 32px;
          padding: 24px;
          background: var(--navy-soft);
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .concept-head {
          margin-bottom: 16px;
        }
        .concept-tag {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold-light);
          font-weight: 600;
        }
        .concept-card :global(h3) {
          font-family: "Lora", serif;
          font-weight: 500;
          font-size: 20px;
          margin: 8px 0 0;
          color: var(--cream);
        }
        .concept-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 16px;
        }
        @media (max-width: 600px) {
          .concept-grid {
            grid-template-columns: 1fr;
          }
        }
        .concept-col {
          padding: 16px;
          border-radius: 10px;
          background: rgba(244, 242, 239, 0.03);
          border: 1px solid var(--line);
        }
        .concept-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--sage);
          margin-bottom: 8px;
        }
        .concept-col:last-child .concept-label {
          color: var(--gold-light);
        }
        .concept-col :global(p) {
          margin: 0;
          font-size: 14px;
          line-height: 1.65;
          color: var(--text-dim);
        }
        .concept-col :global(p strong) {
          color: var(--cream);
        }
        .concept-note {
          margin: 0;
          font-size: 13px;
          color: var(--text-dim);
          font-style: italic;
          padding-top: 12px;
          border-top: 1px solid var(--line);
        }

        /* ---------- VERSE CARD ---------- */
        .verse-card {
          margin-top: 20px;
          padding: 32px 28px;
          text-align: center;
          background: linear-gradient(160deg, rgba(10, 52, 40, 0.5), rgba(0, 21, 39, 0.4));
          border: 1px solid var(--line);
          border-radius: 12px;
          position: relative;
        }
        .verse-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 2px;
          background: var(--gold);
        }
        .verse-lede {
          font-size: 13.5px;
          color: var(--text-dim);
          margin: 12px 0 16px;
          letter-spacing: 0.01em;
        }
        .verse-text {
          font-family: "Lora", serif;
          font-style: italic;
          font-weight: 500;
          font-size: 19px;
          line-height: 1.5;
          color: var(--cream);
          max-width: 480px;
          margin: 0 auto 10px;
        }
        .verse-ref {
          font-size: 12px;
          color: var(--gold-light);
          font-weight: 600;
          letter-spacing: 0.05em;
          margin: 0;
        }

        /* ---------- LOCKED STEP PREVIEW ---------- */
        .locked-note {
          text-align: center;
          padding: 28px;
          margin-top: 36px;
          border: 1px dashed var(--line);
          border-radius: 12px;
          color: var(--text-dim);
          font-size: 13.5px;
          line-height: 1.7;
        }
        .locked-note :global(strong) {
          color: var(--cream);
        }

        /* ---------- STICKY RESULT BAR ---------- */
        .result-bar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 21, 39, 0.92);
          backdrop-filter: blur(14px);
          border-top: 1px solid var(--line);
          padding: 16px 24px;
          z-index: 50;
        }
        .result-inner {
          max-width: 1080px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
        }
        .result-metric {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .result-metric .label {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }
        .result-metric .val {
          font-size: 17px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
        .result-metric.activos .val {
          color: var(--sage);
        }
        .result-metric.pasivos .val {
          color: var(--gold-light);
        }
        .divider {
          width: 1px;
          height: 32px;
          background: var(--line);
        }
        .result-patrimonio {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-left: auto;
          text-align: right;
        }
        .result-patrimonio .label {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }
        .result-patrimonio .val {
          font-family: "Lora", serif;
          font-size: 26px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          transition: color 0.3s;
        }
        .val.positive {
          color: var(--sage);
        }
        .val.negative {
          color: #d9a05b;
        }
        .continue-btn {
          background: var(--gold);
          color: var(--navy);
          border: none;
          padding: 13px 22px;
          border-radius: 9px;
          font-weight: 600;
          font-size: 13.5px;
          font-family: "Montserrat", sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .continue-btn:hover {
          background: var(--gold-light);
        }

        .footer-note {
          text-align: center;
          color: var(--text-dim);
          font-size: 12px;
          margin-top: 28px;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
}

function Panel({
  data,
  panel,
  onToggle,
  onItemName,
  onItemValue,
  onAddItem,
  onRemoveItem,
}: {
  data: RfCategory[];
  panel: PanelKey;
  onToggle: (panel: PanelKey, catId: number) => void;
  onItemName: (panel: PanelKey, catId: number, itemId: number, name: string) => void;
  onItemValue: (panel: PanelKey, catId: number, itemId: number, raw: string) => void;
  onAddItem: (panel: PanelKey, catId: number) => void;
  onRemoveItem: (panel: PanelKey, catId: number, itemId: number) => void;
}) {
  return (
    <div>
      {data.map((cat) => (
        <div key={cat.id} className={"category" + (cat.open ? " open" : "")}>
          <div className="category-head" onClick={() => onToggle(panel, cat.id)}>
            <span className="category-name">
              <CategoryIcon icon={cat.icon} />
              {cat.title}
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span className="category-subtotal">{formatCOP(categoryTotal(cat))}</span>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <div className="category-body">
            <div className="items">
              {cat.items.map((item) => (
                <div key={item.id} className="item-row">
                  <input
                    type="text"
                    value={item.name}
                    placeholder="Nombre del ítem"
                    onChange={(e) => onItemName(panel, cat.id, item.id, e.target.value)}
                  />
                  <div className="value-field">
                    <span>$</span>
                    <input
                      type="text"
                      className="value-input"
                      inputMode="numeric"
                      placeholder="0"
                      value={item.value ? item.value.toLocaleString("es-CO") : ""}
                      onChange={(e) => onItemValue(panel, cat.id, item.id, e.target.value)}
                    />
                  </div>
                  <button className="del-btn" title="Eliminar" onClick={() => onRemoveItem(panel, cat.id, item.id)}>
                    ×
                  </button>
                </div>
              ))}
              <button className="add-row" onClick={() => onAddItem(panel, cat.id)}>
                + Agregar ítem
              </button>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .category {
          background: var(--navy-card);
          border: 1px solid var(--line);
          border-radius: 12px;
          margin-bottom: 14px;
          overflow: hidden;
        }
        .category-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          cursor: pointer;
          user-select: none;
        }
        .category-head:hover {
          background: rgba(244, 242, 239, 0.03);
        }
        .category-name {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .category-name :global(.cat-icon) {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          opacity: 0.85;
        }
        .category-subtotal {
          font-size: 13.5px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--text-dim);
        }
        .chevron {
          transition: transform 0.2s ease;
          color: var(--text-dim);
          flex-shrink: 0;
          margin-left: 10px;
        }
        .category.open .chevron {
          transform: rotate(180deg);
        }
        .category-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s ease;
        }
        .category.open .category-body {
          max-height: 900px;
        }
        .items {
          padding: 4px 16px 14px;
        }
        .item-row {
          display: grid;
          grid-template-columns: 1fr 130px 30px;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
        }
        .item-row input[type="text"] {
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 9px 11px;
          color: var(--cream);
          font-family: "Montserrat", sans-serif;
          font-size: 13.5px;
          width: 100%;
        }
        .item-row .value-field {
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
        .item-row input[type="text"].value-input {
          border: none;
          padding: 9px 0;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .item-row input:focus {
          outline: none;
          border-color: var(--gold);
        }
        .item-row .value-field:focus-within {
          border-color: var(--gold);
        }
        .del-btn {
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
        .del-btn:hover {
          border-color: #c0625a;
          color: #c0625a;
        }
        .add-row {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px dashed var(--line);
          border-radius: 7px;
          padding: 8px 12px;
          color: var(--gold-light);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          margin-top: 2px;
          font-family: "Montserrat", sans-serif;
        }
        .add-row:hover {
          border-color: var(--gold-light);
          background: rgba(201, 162, 39, 0.06);
        }
      `}</style>
    </div>
  );
}
