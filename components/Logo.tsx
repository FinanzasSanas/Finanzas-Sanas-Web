import Image from "next/image";

export default function LogoMark({
  height = 44,
  className,
}: {
  height?: number;
  className?: string;
}) {
  // Isotipo optimizado 320x300 (ratio alto/ancho 0.937)
  const width = Math.round((height * 320) / 300);
  return (
    <Image
      src="/images/isotipo.png"
      alt="Sello Finanzas Sanas"
      width={width}
      height={height}
      className={className}
    />
  );
}
