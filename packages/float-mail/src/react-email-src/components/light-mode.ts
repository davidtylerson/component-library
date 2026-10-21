/**
 * Locks Float emails to their light palette.
 *
 * Email clients fall into three groups when the reader is in dark mode:
 *
 *  1. Apple Mail, iOS Mail, Outlook for Mac/iOS — these auto-invert an email
 *     *unless* it declares which schemes it supports. Declaring `only light`
 *     tells them this email has no dark treatment, and they leave it alone.
 *     This is the single highest-value rule here. (Declaring `light dark`
 *     does the opposite: it opts into dark rendering.)
 *  2. Outlook.com web and the Outlook apps — invert regardless, but stamp
 *     `data-ogsc` / `data-ogsb` on the elements they rewrite, so the original
 *     colours can be re-asserted through those hooks.
 *  3. Gmail, all platforms — force-inverts, honours neither mechanism and
 *     exposes no hooks. Nothing here reaches it.
 *
 * The `!important` is required: react-email inlines every style, and an inline
 * style outranks a stylesheet rule without it.
 */

const LIGHT = {
  page: '#F4F4F5',
  card: '#ffffff',
  ink: '#1A1A1E',
  muted: '#6b7280',
};

/** Re-asserts the light palette for the clients that rewrote it. */
const restore = (prefix: string) => `
  ${prefix} .fl-page { background-color: ${LIGHT.page} !important; }
  ${prefix} .fl-card { background-color: ${LIGHT.card} !important; }
  ${prefix} .fl-card td { color: ${LIGHT.ink} !important; }
`;

/**
 * Side-by-side blocks that stack once the viewport is too narrow to hold them.
 * `!important` again, for the same reason: react-email inlines the base styles.
 */
const RESPONSIVE_CSS = `
  @media only screen and (max-width: 640px) {
    .fl-stack {
      display: block !important;
      width: 100% !important;
      padding-right: 0 !important;
    }
    .fl-stack + .fl-stack { padding-top: 12px !important; }
    /* A 150px label eats most of a phone screen; narrow it so values keep
       room. Both blocks share the value, so they stay aligned. */
    .fl-label { width: 110px !important; }
  }
`;

export const LIGHT_MODE_CSS = `
  :root {
    color-scheme: only light;
    supported-color-schemes: only light;
  }

${restore('[data-ogsc]')}
${restore('[data-ogsb]')}
${RESPONSIVE_CSS}
`;
