// Single-weight hand-drawn icons - matches the prototype exactly

export function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  );
}

export function AccountIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

export function CartIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h2l2.5 12h11L21 9H6" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

export function MenuIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  );
}

export function ArrowIcon({ size = 16, dir = "right" }: { size?: number; dir?: "right" | "left" | "up" | "down" }) {
  const rot: Record<string, number> = { right: 0, left: 180, up: -90, down: 90 };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rot[dir]}deg)` }}
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14,6 20,12 14,18" />
    </svg>
  );
}

export function StarIcon({ size = 14, filled = true }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
    </svg>
  );
}

export function HeartIcon({ size = 18, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 21s-7-4.5-9.5-9C0.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z" />
    </svg>
  );
}

export function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function PlusIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export type SiteIconName =
  | "drinkware" | "board" | "wine" | "flame" | "knife" | "box"
  | "jewelry" | "pen" | "briefcase" | "ring" | "gift" | "sparkle"
  | "file" | "clock" | "lock" | "mail" | "card" | "check"
  | "info" | "truck" | "shield" | "pencil" | "expand";

/** Consistent line icons for category cards and small site callouts. */
export function SiteIcon({ name, size = 22 }: { name: SiteIconName; size?: number }) {
  const paths: Record<SiteIconName, React.ReactNode> = {
    drinkware: <><path d="M5 4h14l-1.3 15a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5 4Z"/><path d="M4 4h16M8 10h8"/></>,
    board: <><rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="12" cy="6.5" r="1"/><path d="M8 12h8M8 16h8"/></>,
    wine: <><path d="M6 3h12v5a6 6 0 0 1-12 0V3ZM12 14v7M7 21h10"/><path d="M6 8h12"/></>,
    flame: <path d="M12 22c4.2 0 7-3 7-7 0-3-1.7-5.2-3-6-1 2-2 2.5-2.5 3-1-4-1.5-6-3.5-9-.2 3-1.3 4.4-3.1 6.4C5.4 11 5 13.2 5 15c0 4 2.8 7 7 7Z"/>,
    knife: <><path d="M3 4c5.5 0 9 2.2 11 7l-3 3L3 4ZM11 14l8 7 2-2-7-8"/><path d="M15 15l2-2"/></>,
    box: <><path d="m12 2 9 5-9 5-9-5 9-5ZM3 7v10l9 5 9-5V7M12 12v10"/><path d="m7.5 4.5 9 5"/></>,
    jewelry: <><path d="M6 3h12l3 6-9 12L3 9l3-6ZM3 9h18M9 3l-2 6 5 12 5-12-2-6"/></>,
    pen: <><path d="m4 20 4.5-1 11-11a2 2 0 0 0-3-3l-11 11L4 20ZM14 7l3 3M4 20l4-4"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12c6 4 12 4 18 0M11 13h2"/></>,
    ring: <><circle cx="12" cy="15" r="7"/><path d="m8 8 2-5h4l2 5M9 3l3 5 3-5"/></>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M2 9h20M12 9v12M12 9C5 9 5 3 8 3c2 0 4 3 4 6Zm0 0c7 0 7-6 4-6-2 0-4 3-4 6Z"/></>,
    sparkle: <><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/></>,
    file: <><path d="M6 2h8l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM14 2v6h5M8 13h8M8 17h8"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    mail: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></>,
    check: <path d="m4 12 5 5L20 6"/>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
    truck: <><path d="M2 5h12v12H2zM14 9h4l4 4v4h-8M2 17h2M14 17h2"/><circle cx="7" cy="18" r="2"/><circle cx="19" cy="18" r="2"/></>,
    shield: <><path d="m12 2 8 3v6c0 5-3 9-8 11-5-2-8-6-8-11V5l8-3Z"/><path d="m8 12 3 3 5-6"/></>,
    pencil: <><path d="m3 21 4.5-1 12-12a2 2 0 0 0-3-3l-12 12L3 21ZM15 7l3 3"/></>,
    expand: <><path d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6"/><path d="m3 3 7 7m11-7-7 7M3 21l7-7m11 7-7-7"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
