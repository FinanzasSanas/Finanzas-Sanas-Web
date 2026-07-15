export function formatCOP(n: number): string {
  const rounded = Math.round(n);
  const neg = rounded < 0;
  const s = Math.abs(rounded).toLocaleString("es-CO");
  return (neg ? "-$ " : "$ ") + s;
}

export function parseCOPInput(str: string): number {
  const clean = (str || "").replace(/[^0-9]/g, "");
  return clean ? parseInt(clean, 10) : 0;
}
