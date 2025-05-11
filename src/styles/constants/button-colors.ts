export const BUTTON_COLORS = {
  primary: {
    bg: 'var(--float-button-primary-bg)',
    bgHover: 'var(--float-button-primary-bg-hover)',
    border: 'var(--float-button-primary-border)',
    borderHover: 'var(--float-button-primary-border-hover)',
    fg: 'var(--float-button-primary-fg)',
    fgHover: 'var(--float-button-primary-fg-hover)',
  },
  primaryError: {
    bg: 'var(--float-button-primary-error-bg)',
    bgHover: 'var(--float-button-primary-error-bg-hover)',
    border: 'var(--float-button-primary-error-border)',
    borderHover: 'var(--float-button-primary-error-border-hover)',
    fg: 'var(--float-button-primary-error-fg)',
    fgHover: 'var(--float-button-primary-error-fg-hover)',
  },
  secondary: {
    bg: 'var(--float-button-secondary-bg)',
    bgHover: 'var(--float-button-secondary-bg-hover)',
    border: 'var(--float-button-secondary-border)',
    borderHover: 'var(--float-button-secondary-border-hover)',
    fg: 'var(--float-button-secondary-fg)',
    fgHover: 'var(--float-button-secondary-fg-hover)',
  },
  secondaryColor: {
    bg: 'var(--float-button-secondary-color-bg)',
    bgHover: 'var(--float-button-secondary-color-bg-hover)',
    border: 'var(--float-button-secondary-color-border)',
    borderHover: 'var(--float-button-secondary-color-border-hover)',
    fg: 'var(--float-button-secondary-color-fg)',
    fgHover: 'var(--float-button-secondary-color-fg-hover)',
  },
  secondaryError: {
    bg: 'var(--float-button-secondary-error-bg)',
    bgHover: 'var(--float-button-secondary-error-bg-hover)',
    border: 'var(--float-button-secondary-error-border)',
    borderHover: 'var(--float-button-secondary-error-border-hover)',
    fg: 'var(--float-button-secondary-error-fg)',
    fgHover: 'var(--float-button-secondary-error-fg-hover)',
  },
  tertiary: {
    bgHover: 'var(--float-button-tertiary-bg-hover)',
    fg: 'var(--float-button-tertiary-fg)',
    fgHover: 'var(--float-button-tertiary-fg-hover)',
  },
  tertiaryColor: {
    bgHover: 'var(--float-button-tertiary-color-bg-hover)',
    fg: 'var(--float-button-tertiary-color-fg)',
    fgHover: 'var(--float-button-tertiary-color-fg-hover)',
  },
  tertiaryError: {
    bgHover: 'var(--float-button-tertiary-error-bg-hover)',
    fg: 'var(--float-button-tertiary-error-fg)',
    fgHover: 'var(--float-button-tertiary-error-fg-hover)',
  },
} as const;

export type ButtonVariant = keyof typeof BUTTON_COLORS; 