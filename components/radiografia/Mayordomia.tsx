"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { formatCOP, parseCOPInput } from "@/lib/radiografia/format";
import { CAJAS_DEFAULT, MAYORDOMIA_STORAGE_KEY, createDefaultMayordomiaState } from "@/lib/radiografia/mayordomia-data";
import { PRESUPUESTO_STORAGE_KEY, createDefaultPresupuestoState } from "@/lib/radiografia/presupuesto-data";
import { useLocalStorageState } from "@/lib/radiografia/useLocalStorageState";

export default function Mayordomia() {
  const router = useRouter();
  const [presupuesto, , presupuestoHydrated] = useLocalStorageState(PRESUPUESTO_STORAGE_KEY, createDefaultPresupuestoState());
  const [state, setState, hydrated] = useLocalStorageState(MAYORDOMIA_STORAGE_KEY, createDefaultMayordomiaState());

  const esSuperavit = (presupuesto.flujo ?? 0) >= 0;

  useEffect(() => {
    if (!presupuestoHydrated) return;
    if (!presupuesto.completedAt) {
      router.replace("/radiografia-financiera/presupuesto");
    } else if (!esSuperavit) {
      router.replace("/radiografia-financiera/plan-ser");
    }
  }, [presupuestoHydrated, presupuesto.completedAt, esSuperavit, router]);

  const flujoTotal = state.flujoOverride ?? presupuesto.flujo ?? 0;

  function updatePct(id: string, raw: string) {
    let val = parseInt((raw || "0").replace(/[^0-9]/g, ""), 10);
    if (isNaN(val)) val = 0;
    if (val > 100) val = 100;
    setState((prev) => ({
      ...prev,
      cajas: prev.cajas.map((c) => (c.id === id ? { ...c, pct: val } : c)),
    }));
  }

  function updateFlujoOverride(raw: string) {
    setState((prev) => ({ ...prev, flujoOverride: parseCOPInput(raw) }));
  }

  const totalPct = state.cajas.reduce((s, c) => s + c.pct, 0);

  if (!hydrated || !presupuestoHydrated || !presupuesto.completedAt || !esSuperavit) {
    return <div className="rf-shell" style={{ minHeight: "60vh" }} />;
  }

  return (
    <div className="rf-shell">
      <div className="hero">
        <div className="scanline" />
        <div className="hero-inner">
          <div className="eyebrow">Módulo 5 · Herramientas para una buena administración</div>
          <h1>
            Sistema de <em>Mayordomía Financiera</em>
          </h1>
          <p className="lede">
            Ya ordenaste tus finanzas. Ahora toca dirigirlas con propósito: separa tu dinero en diferentes cajas
            para usos específicos, a propósito, no por accidente.
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
                <div className="step-label">Mayordomía Financiera</div>
                <div className="step-sub">Sistema de cajas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="intro">
          <div className="intro-mark">Radah · gobernar</div>
          <p>
            <strong>
              Someter (Kabash) es tomar lo desordenado y ponerlo en orden. Dominar (Radah) es dirigir lo ordenado
              hacia un propósito.
            </strong>{" "}
            Ya hiciste lo primero en los Bloques 1 y 2. Ahora tomamos ese orden y lo dirigimos estratégicamente —
            porque el dinero es dinámico, no estático.
          </p>
        </div>

        <div className="mode-card">
          <div className="amount-row">
            <span className="amount-label">Tu Flujo de Efectivo mensual (Bloque 2)</span>
            <div className="amount-field">
              <span>$</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={flujoTotal ? flujoTotal.toLocaleString("es-CO") : ""}
                onChange={(e) => updateFlujoOverride(e.target.value)}
              />
            </div>
          </div>
        </div>

        <h2 className="cajas-title">Tus cajas</h2>
        <p className="cajas-sub">
          Ajusta el porcentaje de cada caja. Puedes modificarlas como quieras — lo importante es que separes tu
          dinero a propósito, no que quede flotando sin dirección.
        </p>

        <div className="cajas-grid">
          {CAJAS_DEFAULT.map((meta) => {
            const caja = state.cajas.find((c) => c.id === meta.id)!;
            return (
              <div className="caja" key={meta.id}>
                <div className="caja-head">
                  <span className="caja-name">{meta.name}</span>
                </div>
                <p className="desc">{meta.desc}</p>
                <div className="caja-controls">
                  <div className="pct-field">
                    <input type="text" inputMode="numeric" value={caja.pct} onChange={(e) => updatePct(meta.id, e.target.value)} />
                    <span>%</span>
                  </div>
                  <span className="caja-amount">{formatCOP((flujoTotal * caja.pct) / 100)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="total-check">
          <div>
            <div className="tc-label">Total asignado</div>
            <div className={"tc-val " + (totalPct === 100 ? "ok" : "bad")}>{totalPct}%</div>
          </div>
          <div className="tc-msg">
            {totalPct === 100
              ? "Perfecto — tu dinero está 100% dirigido."
              : totalPct < 100
              ? `Te falta asignar ${100 - totalPct}% para dirigir todo tu dinero.`
              : `Te pasaste por ${totalPct - 100}% — ajusta alguna caja.`}
          </div>
        </div>

        <div className="closing-card">
          <p>
            &quot;La riqueza lograda de la noche a la mañana pronto desaparece; pero la que es fruto del arduo
            trabajo aumenta con el tiempo&quot; — <strong>Proverbios 13:11 (NTV)</strong>. No necesitas acertar
            hoy con los porcentajes exactos; necesitas empezar a dirigir tu dinero con intención, mes tras mes.
          </p>
        </div>

        <p className="footer-note">
          Tus datos se guardan solo en este dispositivo mientras trabajas en el taller. Nada se comparte ni se
          almacena fuera de este navegador.
        </p>
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
          color: var(--sage);
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

        .mode-card {
          padding: 24px;
          background: var(--navy-card);
          border: 1px solid var(--line);
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .amount-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .amount-label {
          font-size: 13px;
          color: var(--text-dim);
          font-weight: 600;
          flex-shrink: 0;
        }
        .amount-field {
          display: flex;
          align-items: center;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 9px;
          padding: 0 14px;
          flex: 1;
          min-width: 220px;
        }
        .amount-field span {
          font-size: 15px;
          color: var(--text-dim);
          margin-right: 4px;
        }
        .amount-field input {
          border: none;
          background: transparent;
          padding: 13px 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--cream);
          width: 100%;
          font-variant-numeric: tabular-nums;
          font-family: "Lora", serif;
        }
        .amount-field:focus-within {
          border-color: var(--gold);
        }
        .amount-field input:focus {
          outline: none;
        }

        .cajas-title {
          font-family: "Lora", serif;
          font-size: 22px;
          font-weight: 500;
          margin: 8px 0 4px;
          color: var(--cream);
        }
        .cajas-sub {
          font-size: 13.5px;
          color: var(--text-dim);
          margin: 0 0 20px;
        }
        .cajas-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
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
        .caja-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .caja-name {
          font-family: "Lora", serif;
          font-size: 16.5px;
          font-weight: 600;
          color: var(--gold-light);
        }
        .caja p.desc {
          font-size: 12.5px;
          color: var(--text-dim);
          line-height: 1.6;
          margin: 0 0 14px;
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
          font-size: 15.5px;
          font-weight: 600;
          color: var(--sage);
          font-variant-numeric: tabular-nums;
        }

        .total-check {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-radius: 10px;
          background: var(--navy-soft);
          border: 1px solid var(--line);
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .total-check .tc-label {
          font-size: 12.5px;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }
        .total-check .tc-val {
          font-family: "Lora", serif;
          font-size: 20px;
          font-weight: 600;
        }
        .tc-val.ok {
          color: var(--sage);
        }
        .tc-val.bad {
          color: var(--warn);
        }
        .tc-msg {
          font-size: 12.5px;
          color: var(--text-dim);
        }

        .closing-card {
          padding: 26px 28px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: linear-gradient(160deg, rgba(10, 52, 40, 0.4), rgba(11, 36, 56, 0.4));
          text-align: center;
        }
        .closing-card :global(p) {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-dim);
          max-width: 560px;
          margin: 0 auto;
        }
        .closing-card :global(strong) {
          color: var(--cream);
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
