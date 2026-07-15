import type { IconKey } from "./types";

const paths: Record<IconKey, JSX.Element> = {
  money: (
    <>
      <path d="M2 6h20v12H2z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v10h14V10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </>
  ),
  car: (
    <>
      <path d="M3 13l2-6h14l2 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="2" y="13" width="20" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </>
  ),
  chart: <path d="M4 20V10M12 20V4M20 20v-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  box: (
    <>
      <path d="M3 8l9-5 9 5-9 5-9-5z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 8v9l9 5 9-5V8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  book: (
    <>
      <path d="M4 4h11a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M4 4a3 3 0 013 3v13" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  heart: (
    <path
      d="M12 20s-7-4.35-9.5-8.5C.7 8.2 2.3 5 5.6 5c1.8 0 3.2 1 4.4 2.6C11.2 6 12.6 5 14.4 5c3.3 0 4.9 3.2 3.1 6.5C19 15.65 12 20 12 20z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
};

export function CategoryIcon({ icon }: { icon: IconKey }) {
  return (
    <svg className="cat-icon" viewBox="0 0 24 24">
      {paths[icon]}
    </svg>
  );
}
