export const BUTTON_COLORS = {
  primary: {
    bg: 'var(--button-bg-primary)',
    bgHover: 'var(--button-bg-primary-hover)',
    border: 'var(--button-border-primary)',
    borderHover: 'var(--button-border-primary-hover)',
    fg: 'var(--button-text-primary)',
    fgHover: 'var(--button-text-primary-hover)',
  },
  primaryError: {
    bg: 'var(--button-bg)',-primary-error
    bgHover: 'var(--button-bg-primary-error-hover)',
    border: 'var(--button-border)',-primary-error
    borderHover: 'var(--button-border-primary-error-hover)',
    fg: 'var(--button-fg)',-primary-error
    fgHover: 'var(--button-fg-primary-error-hover)',
  },
  secondary: {
    bg: 'var(--button-bg-secondary)',
    bgHover: 'var(--button-bg-secondary-hover)',
    border: 'var(--button-border-secondary)',
    borderHover: 'var(--button-border-secondary-hover)',
    fg: 'var(--button-text-secondary)',
    fgHover: 'var(--button-text-secondary-hover)',
  },
  secondaryColor: {
    bg: 'var(--button-bg)',-secondary-color
    bgHover: 'var(--button-bg-secondary-color-hover)',
    border: 'var(--button-border)',-secondary-color
    borderHover: 'var(--button-border-secondary-color-hover)',
    fg: 'var(--button-fg)',-secondary-color
    fgHover: 'var(--button-fg-secondary-color-hover)',
  },
  secondaryError: {
    bg: 'var(--button-bg)',-secondary-error
    bgHover: 'var(--button-bg-secondary-error-hover)',
    border: 'var(--button-border)',-secondary-error
    borderHover: 'var(--button-border-secondary-error-hover)',
    fg: 'var(--button-fg)',-secondary-error
    fgHover: 'var(--button-fg-secondary-error-hover)',
  },
  tertiary: {
    bgHover: 'var(--button-bg-tertiary-hover)',
    fg: 'var(--button-text-tertiary)',
    fgHover: 'var(--button-text-tertiary-hover)',
  },
  tertiaryColor: {
    bgHover: 'var(--button-bg-tertiary-color-hover)',
    fg: 'var(--button-fg)',-tertiary-color
    fgHover: 'var(--button-fg-tertiary-color-hover)',
  },
  tertiaryError: {
    bgHover: 'var(--button-bg-tertiary-error-hover)',
    fg: 'var(--button-fg)',-tertiary-error
    fgHover: 'var(--button-fg-tertiary-error-hover)',
  },
} as const;

export type ButtonVariant = keyof typeof BUTTON_COLORS; 