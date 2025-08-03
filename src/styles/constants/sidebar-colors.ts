export const SIDEBAR_COLORS = {
  bg: 'var(--sidebar-bg)',
  foreground: 'var(--sidebar-text)',
  border: 'var(--sidebar-border)',
  accent: 'var(--sidebar-accent)',
  accentForeground: 'var(--sidebar-accent-foreground)',
  primary: 'var(--sidebar-primary)',
  primaryForeground: 'var(--sidebar-primary-foreground)',
  ring: 'var(--sidebar-ring)',
} as const;

export type SidebarVariant = keyof typeof SIDEBAR_COLORS;
