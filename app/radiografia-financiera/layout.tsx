import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radiografía Financiera | Finanzas Sanas",
  description:
    "Haz tu diagnóstico financiero completo: Balance General, Presupuesto Mensual y tu plan de mayordomía o de ajuste.",
};

export default function RadiografiaFinancieraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
