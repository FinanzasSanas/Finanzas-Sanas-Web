"use client";

import { useRouter } from "next/navigation";
import { BALANCE_STORAGE_KEY, createDefaultBalanceState } from "@/lib/radiografia/balance-data";
import { formatCOP, parseCOPInput } from "@/lib/radiografia/format";
import { CategoryIcon } from "@/lib/radiografia/icons";
import {
  PRESUPUESTO_STORAGE_KEY,
  categoryTotal,
  createDefaultPresupuestoState,
  panelTotal,
  totalByTag,
} from "@/lib/radiografia/presupuesto-data";
import type { RfCategory, Tag } from "@/lib/radiografia/types";
import { useLocalStorageState } from "@/lib/radiografia/useLocalStorageState";
import { useEffect } from "react";

let clientUid = 200000;
const nextClientId = () => ++clientUid;

type PanelKey = "ingresos" | "egresos";

export default function Presupuesto() {
  const router = useRouter();
  const [balance, , balanceHydrated] = useLocalStorageState(BALANCE_STORAGE_KEY, createDefaultBalanceState());
  const [state, setState, hydrated] = useLocalStorageState(PRESUPUESTO_STORAGE_KEY, createDefaultPresupuestoState());

  useEffect(() => {
    if (balanceHydrated && !balance.completedAt) {
      router.replace("/radiografia-financiera");
    }
  }, [balanceHydrated, balance.completedAt, router]);

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

  function toggleItemTag(catId: number, itemId: number) {
    updateCategory("egresos", catId, (c) => ({
      ...c,
      items: c.items.map((i) => (i.id === itemId ? { ...i, tag: (i.tag === "necesidad" ? "deseo" : "necesidad") as Tag } : i)),
    }));
  }

  function addItem(panel: PanelKey, catId: number, excludeTag: boolean) {
    updateCategory(panel, catId, (c) => ({
      ...c,
      items: [...c.items, { id: nextClientId(), name: "", value: 0, tag: excludeTag ? undefined : "necesidad" }],
    }));
  }

  function removeItem(panel: PanelKey, catId: number, itemId: number) {
    updateCategory(panel, catId, (c) => ({
      ...c,
      items: c.items.filter((i) => i.id !== itemId),
    }));
  }

  const totalIngresos = panelTotal(state.ingresos);
  const totalEgresos = panelTotal(state.egresos);
  const flujo = totalIngresos - totalEgresos;
  const cvTotal = totalByTag(state.egresos, "necesidad");
  const evTotal = totalByTag(state.egresos, "deseo");
  const cvPct = totalIngresos > 0 ? Math.round((cvTotal / totalIngresos) * 100) : 0;
  const evPct = totalIngresos > 0 ? Math.round((evTotal / totalIngresos) * 100) : 0;
  const esSuperavit = flujo >= 0;

  function handleContinue() {
    const next = { ...state, completedAt: new Date().toISOString(), flujo };
    setState(next);
    try {
      window.localStorage.setItem(PRESUPUESTO_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota / privacy-mode errors
    }
    router.push(esSuperavit ? "/radiografia-financiera/mayordomia" : "/radiografia-financiera/plan-ser");
  }

  if (!hydrated || !balanceHydrated || !balance.completedAt) {
    return <div className="rf-shell" style={{ minHeight: "60vh" }} />;
  }

  return (
    <div className="rf-shell">
      <div className="hero">
        <div className="scanline" />
        <div className="hero-inner">
          <div className="eyebrow">Módulo 5 · Herramientas para una buena administración</div>
          <h1>
            Presupuesto <em>Mensual</em>
          </h1>
          <p className="lede">
            Ya viste tu Balance General — una fotografía de tu patrimonio. Ahora vamos a la película: cuánto entra
            y cuánto sale cada mes. Este es el término más importante de todo tu diagnóstico: tu Flujo de
            Efectivo.
          </p>

          <div className="stepper">
            <div className="step done">
              <div className="step-num">✓</div>
              <div>
                <div className="step-label">Balance General</div>
                <div className="step-sub">Completado</div>
              </div>
            </div>
            <div className="step active">
              <div className="step-num">2</div>
              <div>
                <div className="step-label">Presupuesto Mensual</div>
                <div className="step-sub">Ingresos, egresos y flujo de efectivo</div>
              </div>
            </div>
            <div className="step locked">
              <div className="step-num">3</div>
              <div>
                <div className="step-label">{esSuperavit ? "Mayordomía Financiera" : "Plan SER"}</div>
                <div className="step-sub">{esSuperavit ? "Sistema de cajas" : "Tu camino de salida"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="intro">
          <div className="intro-mark">Kabash · orden dinámico</div>
          <p>
            Tu Balance General te mostró dónde estás parado hoy. Tu Presupuesto Mensual te muestra hacia dónde te
            diriges. <strong>El estado financiero es dinámico</strong> — cambia mes a mes — por eso este ejercicio
            no es de una sola vez: es un hábito. Regístralo con la misma honestidad que usaste en el Bloque 1.
          </p>
        </div>

        <div className="panels">
          <div>
            <div className="panel-head">
              <span className="panel-title ingresos">Ingresos</span>
              <span className="panel-total">{formatCOP(totalIngresos)}</span>
            </div>
            <Panel
              data={state.ingresos}
              panel="ingresos"
              onToggle={toggleCategory}
              onItemName={updateItemName}
              onItemValue={updateItemValue}
              onToggleTag={toggleItemTag}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          </div>

          <div>
            <div className="panel-head">
              <span className="panel-title egresos">Egresos</span>
              <span className="panel-total">{formatCOP(totalEgresos)}</span>
            </div>
            <p className="egresos-hint">
              Despliega &quot;Deudas&quot; y &quot;Obligaciones financieras&quot; para ver la diferencia entre
              ambas antes de clasificar tus gastos.
            </p>
            <Panel
              data={state.egresos}
              panel="egresos"
              onToggle={toggleCategory}
              onItemName={updateItemName}
              onItemValue={updateItemValue}
              onToggleTag={toggleItemTag}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          </div>
        </div>

        <div className="cv-ev-card">
          <div className="cv-ev-head">
            <span className="cv-ev-tag">Prioridad de tus gastos</span>
            <h3>Calidad de Vida vs. Estilo de Vida</h3>
            <p className="cv-ev-intro">
              Calidad de vida cubre lo esencial para vivir — vivienda, comida, transporte, salud, servicios
              públicos. Estilo de vida es todo lo demás: no es malo, pero nunca sacrificamos la calidad de vida
              para sostener el estilo de vida.
            </p>
          </div>
          <div className="cv-ev-grid">
            <div className="cv-ev-col necesidad">
              <div className="cv-ev-label">Calidad de Vida (Necesidades)</div>
              <div className="cv-ev-amount">{formatCOP(cvTotal)}</div>
              <div className="cv-ev-pct">{cvPct}% de tus ingresos</div>
            </div>
            <div className="cv-ev-col deseo">
              <div className="cv-ev-label">Estilo de Vida (Deseos)</div>
              <div className="cv-ev-amount">{formatCOP(evTotal)}</div>
              <div className="cv-ev-pct">{evPct}% de tus ingresos</div>
            </div>
          </div>
        </div>

        <div className="def-strip">
          <div className="def-box sup">
            <div className="tag">Superávit</div>
            <p>
              Cuando tus <strong>ingresos son mayores</strong> que tus gastos. Aquí es donde comienza la
              construcción de capital.
            </p>
          </div>
          <div className="def-box def">
            <div className="tag">Déficit</div>
            <p>
              Cuando tus <strong>gastos son mayores</strong> que tus ingresos. No es una condena — es información
              para decidir con sabiduría.
            </p>
          </div>
        </div>

        {esSuperavit ? (
          <div className="outcome show">
            <div className="outcome-card sup">
              <div className="outcome-tag">Vas en la dirección correcta</div>
              <h3>Tienes Superávit</h3>
              <p>
                Tu Flujo de Efectivo es positivo — te queda dinero cada mes después de cubrir tus gastos. Ya
                ordenaste tus finanzas (<strong>Kabash</strong>); ahora viene el paso de dirigirlas con propósito
                (<strong>Radah</strong>).
              </p>
              <p>
                En el <strong>Bloque 3: Sistema de Mayordomía Financiera</strong> aprenderás a distribuir este
                excedente en diferentes &quot;cajas&quot; — gastos, inversión, imprevistos y educación — para que
                tu dinero avance hacia un propósito, no solo hacia el gasto.
              </p>
            </div>
          </div>
        ) : (
          <div className="outcome show">
            <div className="outcome-card def">
              <div className="outcome-tag">Un ajuste, no una sentencia</div>
              <h3>Tienes Déficit</h3>
              <p>
                Tus gastos superan tus ingresos este mes. Esto no te define — es simplemente información para
                tomar decisiones sabias hoy. Controlar tus gastos no te hará rico, pero no hacerlo sí puede
                mantenerte pobre. El objetivo es liberar flujo para poder empezar a construir unas finanzas sanas.
              </p>

              <div className="ser-announce">
                <p className="ser-announce-lede">
                  Aquí está la clave para cambiar ese déficit: el concepto <strong>SER</strong> — las primeras
                  letras de Simplificar, Eliminar y Reducir.
                </p>
                <p className="ser-announce-verse">
                  &ldquo;Pues Dios no nos ha dado un espíritu de temor y timidez sino de poder, amor y
                  autodisciplina.&rdquo;
                </p>
                <p className="ser-announce-ref">2 Timoteo 1:7 (NTV)</p>
                <p className="ser-announce-close">
                  No es fuerza de voluntad sola — es el mismo Espíritu que te da poder y amor el que también te da
                  la autodisciplina para hacer estos ajustes.
                </p>
              </div>

              <div className="ser-grid">
                <div className="ser-item">
                  <div className="ser-title">Simplificar</div>
                  <p>
                    Paga menos por lo mismo. Busca obtener el mismo valor a menor costo — una tarjeta sin cuota de
                    manejo, un plan más económico con la misma cobertura.
                  </p>
                </div>
                <div className="ser-item">
                  <div className="ser-title">Eliminar</div>
                  <p>Quita lo que no te aporta ningún valor real — una suscripción que no usas, una membresía olvidada.</p>
                </div>
                <div className="ser-item">
                  <div className="ser-title">Reducir</div>
                  <p>Ajusta los gastos a lo que realmente necesitas y deseas — sin culpa, con intención.</p>
                </div>
              </div>

              <p>
                Continuemos con tu <strong>Plan SER</strong> — ahí vas a escribir, concepto por concepto, qué vas
                a simplificar, eliminar y reducir, y cuánto puedes liberar cada mes.
              </p>
            </div>
          </div>
        )}

        <div className="locked-note">
          {esSuperavit ? (
            <>
              🔒 <strong>Bloque 3: Sistema de Mayordomía Financiera</strong> se desbloqueará después de guardar tu
              Presupuesto Mensual.
            </>
          ) : (
            <>
              🔒 Tu <strong>Plan SER</strong> se desbloqueará después de guardar tu Presupuesto Mensual.
            </>
          )}
        </div>

        <p className="footer-note">
          Tus datos se guardan solo en este dispositivo mientras trabajas en el taller. Nada se comparte ni se
          almacena fuera de este navegador.
        </p>
      </div>

      <div className="result-bar">
        <div className="result-inner">
          <div className="result-metric ingresos">
            <span className="label">Total Ingresos</span>
            <span className="val">{formatCOP(totalIngresos)}</span>
          </div>
          <div className="divider" />
          <div className="result-metric egresos">
            <span className="label">Total Egresos</span>
            <span className="val">{formatCOP(totalEgresos)}</span>
          </div>
          <div className="result-patrimonio">
            <span className="label">Flujo de Efectivo (Flujo Neto)</span>
            <span className={"val " + (esSuperavit ? "positive" : "negative")}>{formatCOP(flujo)}</span>
          </div>
          <button className="continue-btn" onClick={handleContinue}>
            {esSuperavit ? "Continuar a Bloque 3 →" : "Continuar a tu Plan SER →"}
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
          padding: 0 24px 140px;
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
          max-width: 600px;
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
        .step.locked {
          opacity: 0.45;
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
        .panel-title.ingresos {
          color: var(--sage);
        }
        .panel-title.egresos {
          color: var(--gold-light);
        }
        .panel-total {
          font-size: 15px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
        .egresos-hint {
          font-size: 12.5px;
          color: var(--text-dim);
          line-height: 1.6;
          margin: -6px 0 14px;
          font-style: italic;
        }

        .cv-ev-card {
          padding: 24px;
          margin-bottom: 20px;
          border-radius: 12px;
          background: var(--navy-soft);
          border: 1px solid var(--line);
          margin-top: 32px;
        }
        .cv-ev-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold-light);
        }
        .cv-ev-card :global(h3) {
          font-family: "Lora", serif;
          font-weight: 500;
          font-size: 20px;
          margin: 8px 0 10px;
          color: var(--cream);
        }
        .cv-ev-intro {
          margin: 0 0 18px;
          font-size: 13.5px;
          line-height: 1.7;
          color: var(--text-dim);
        }
        .cv-ev-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 600px) {
          .cv-ev-grid {
            grid-template-columns: 1fr;
          }
        }
        .cv-ev-col {
          padding: 18px;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: rgba(244, 242, 239, 0.03);
        }
        .cv-ev-col.necesidad {
          border-color: rgba(111, 161, 132, 0.35);
        }
        .cv-ev-col.deseo {
          border-color: rgba(201, 162, 39, 0.35);
        }
        .cv-ev-label {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .cv-ev-col.necesidad .cv-ev-label {
          color: var(--sage);
        }
        .cv-ev-col.deseo .cv-ev-label {
          color: var(--gold-light);
        }
        .cv-ev-amount {
          font-family: "Lora", serif;
          font-size: 24px;
          font-weight: 600;
          color: var(--cream);
          margin-bottom: 4px;
          font-variant-numeric: tabular-nums;
        }
        .cv-ev-pct {
          font-size: 12.5px;
          color: var(--text-dim);
        }

        .def-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 32px;
        }
        @media (max-width: 600px) {
          .def-strip {
            grid-template-columns: 1fr;
          }
        }
        .def-box {
          padding: 16px 18px;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: var(--navy-card);
        }
        .def-box .tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .def-box.sup .tag {
          color: var(--sage);
        }
        .def-box.def .tag {
          color: var(--warn);
        }
        .def-box :global(p) {
          margin: 0;
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.6;
        }
        .def-box :global(strong) {
          color: var(--cream);
        }

        .outcome {
          margin-top: 36px;
        }
        .outcome-card {
          padding: 26px 28px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: var(--navy-soft);
        }
        .outcome-card.sup {
          border-color: rgba(111, 161, 132, 0.4);
          background: linear-gradient(160deg, rgba(10, 52, 40, 0.45), rgba(11, 36, 56, 0.4));
        }
        .outcome-card.def {
          border-color: rgba(217, 160, 91, 0.35);
        }
        .outcome-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .outcome-card.sup .outcome-tag {
          color: var(--sage);
        }
        .outcome-card.def .outcome-tag {
          color: var(--warn);
        }
        .outcome-card :global(h3) {
          font-family: "Lora", serif;
          font-weight: 500;
          font-size: 21px;
          margin: 0 0 12px;
        }
        .outcome-card :global(p) {
          margin: 0 0 10px;
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--text-dim);
        }
        .outcome-card :global(p:last-child) {
          margin-bottom: 0;
        }
        .outcome-card :global(strong) {
          color: var(--cream);
        }

        .ser-announce {
          text-align: center;
          padding: 22px 20px;
          margin-top: 20px;
          border-radius: 10px;
          background: linear-gradient(160deg, rgba(10, 52, 40, 0.4), rgba(0, 21, 39, 0.3));
          border: 1px solid var(--line);
        }
        .ser-announce-lede {
          font-size: 14px;
          color: var(--cream);
          margin: 0 0 14px;
          line-height: 1.6;
        }
        .ser-announce-verse {
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
        .ser-announce-ref {
          font-size: 11.5px;
          color: var(--gold-light);
          font-weight: 600;
          letter-spacing: 0.05em;
          margin: 0 0 14px;
        }
        .ser-announce-close {
          font-size: 12.5px;
          color: var(--text-dim);
          margin: 0;
          font-style: italic;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .ser-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin: 18px 0;
        }
        @media (max-width: 700px) {
          .ser-grid {
            grid-template-columns: 1fr;
          }
        }
        .ser-item {
          padding: 16px;
          border-radius: 10px;
          background: rgba(244, 242, 239, 0.03);
          border: 1px solid var(--line);
        }
        .ser-item .ser-title {
          font-family: "Lora", serif;
          font-size: 15.5px;
          font-weight: 600;
          color: var(--gold-light);
          margin-bottom: 6px;
        }
        .ser-item :global(p) {
          font-size: 13px;
          margin: 0;
          color: var(--text-dim);
          line-height: 1.6;
        }

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
        .result-metric.ingresos .val {
          color: var(--sage);
        }
        .result-metric.egresos .val {
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
          color: var(--warn);
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
  onToggleTag,
  onAddItem,
  onRemoveItem,
}: {
  data: RfCategory[];
  panel: PanelKey;
  onToggle: (panel: PanelKey, catId: number) => void;
  onItemName: (panel: PanelKey, catId: number, itemId: number, name: string) => void;
  onItemValue: (panel: PanelKey, catId: number, itemId: number, raw: string) => void;
  onToggleTag: (catId: number, itemId: number) => void;
  onAddItem: (panel: PanelKey, catId: number, excludeTag: boolean) => void;
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
            {cat.note && <p className="category-note">{cat.note}</p>}
            <div className="items">
              {cat.items.map((item) => {
                const showTag = item.tag !== undefined && !cat.excludeTag;
                return (
                  <div key={item.id} className="item-row" style={{ gridTemplateColumns: showTag ? "1fr auto 130px 30px" : "1fr 130px 30px" }}>
                    <input
                      type="text"
                      value={item.name}
                      placeholder="Nombre del ítem"
                      onChange={(e) => onItemName(panel, cat.id, item.id, e.target.value)}
                    />
                    {showTag && (
                      <button type="button" className={"tag-toggle " + item.tag} onClick={() => onToggleTag(cat.id, item.id)}>
                        {item.tag === "necesidad" ? "Necesidad" : "Deseo"}
                      </button>
                    )}
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
                );
              })}
              <button className="add-row" onClick={() => onAddItem(panel, cat.id, !!cat.excludeTag)}>
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
          max-height: 2000px;
        }
        .category-note {
          margin: 0;
          padding: 12px 16px;
          font-size: 12.5px;
          font-style: italic;
          line-height: 1.6;
          color: var(--gold-light);
          background: rgba(201, 162, 39, 0.06);
          border-bottom: 1px solid var(--line);
        }
        .items {
          padding: 4px 16px 14px;
        }
        .item-row {
          display: grid;
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
        .tag-toggle {
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 7px 12px;
          font-size: 11.5px;
          font-weight: 600;
          font-family: "Montserrat", sans-serif;
          cursor: pointer;
          white-space: nowrap;
          background: transparent;
          transition: 0.15s;
        }
        .tag-toggle.necesidad {
          color: var(--sage);
          border-color: rgba(111, 161, 132, 0.4);
          background: rgba(111, 161, 132, 0.08);
        }
        .tag-toggle.deseo {
          color: var(--gold-light);
          border-color: rgba(201, 162, 39, 0.4);
          background: rgba(201, 162, 39, 0.08);
        }
        .tag-toggle:hover {
          opacity: 0.8;
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
        @media (max-width: 480px) {
          .item-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
