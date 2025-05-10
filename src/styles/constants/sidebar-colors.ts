export const SIDEBAR_COLORS = {
  bg: 'var(--float-sidebar-bg)',
  foreground: 'var(--float-sidebar-foreground)',
  border: 'var(--float-sidebar-border)',
  accent: 'var(--float-sidebar-accent)',
  accentForeground: 'var(--float-sidebar-accent-foreground)',
  primary: 'var(--float-sidebar-primary)',
  primaryForeground: 'var(--float-sidebar-primary-foreground)',
  ring: 'var(--float-sidebar-ring)',
} as const;

export type SidebarVariant = keyof typeof SIDEBAR_COLORS; 