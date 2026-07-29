import React from 'react';
import { EmailLayout } from './EmailLayout';

/**
 * DocumentActionEmail
 *
 * Shared body for the three "document action" emails — Share, Dispute, and
 * Return. Float can now act on any number of documents in one action, so each
 * document renders as its own vertical Field/Value card (the per-trade detail
 * card from AffirmationMultipleSummary, minus the "Counterparty Economics"
 * column, which has no job in an email that reports a completed action).
 *
 * One document means one card. There is no separate single-document layout.
 *
 * Like the other Float templates this is dual-mode:
 *   - Preview mode (real data) -> rendered with React for the in-app preview.
 *   - Export mode (no data)    -> emits raw Handlebars so SendGrid can loop
 *     over `dynamic_table_data` at send time.
 *
 * Both branches are generated from the same `ROW_SPECS` and the same style
 * objects, serialized to inline CSS by `css()`. That is deliberate: hand-
 * maintaining two copies of this markup is how the branches drift apart, and
 * a drifted export branch is invisible in the preview.
 */

const FONT = 'Helvetica-Neue, Helvetica, Arial, sans-serif';
const CELL_BORDER = '1px solid #e5e7eb';
const EM_DASH = '—';
/**
 * The export branch uses the entity rather than the literal character. The
 * rendered output carries no charset meta, so a raw U+2014 relies entirely on
 * the sending transport declaring UTF-8; the entity is safe either way. Both
 * forms display identically, so the preview branch keeps the literal.
 */
const EM_DASH_ENTITY = '&mdash;';

/** Serialize a React style object to an inline CSS string for the Handlebars branch. */
const css = (style: React.CSSProperties): string =>
  Object.entries(style)
    .filter(([, value]) => value !== undefined)
    .map(
      ([prop, value]) =>
        `${prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value}`
    )
    .join('; ');

export interface DocumentRow {
  documentId?: string;
  documentFileName?: string;
  party1TradeId?: string;
  party2TradeId?: string;
  party2ContractId?: string;
  tradeDate?: string;
  confirmationDate?: string;
  tradeType?: string;
  productType?: string;
}

export type DocumentActionVariant = 'share' | 'dispute' | 'return';

interface VariantConfig {
  /** Uppercase status pill label. */
  pillLabel: string;
  /** Pill background. Every value is already in the Float palette. */
  pillColor: string;
  /** Handlebars variable holding the actor name, used for export-mode output. */
  actorVar: string;
  /** Past-tense verb for the headline. */
  verb: string;
  /** Whether the optional `message` block renders above the cards. */
  showMessage: boolean;
  /** Whether to state that the executed confirmation is attached. */
  attachmentNote: boolean;
  preheader: string;
}

/**
 * A human shares documents; an institution disputes or returns a confirmation.
 * Hence `person_name` for share and `organization_name` for the other two.
 *
 * Pill colors are the existing brand purple (Button, Header, Footer) and the
 * Callout success/error accents, used as solid backgrounds with white text.
 * Solid-with-white beats a tinted background with colored text here: at 10px
 * bold uppercase, `#10b981` on `#d1fae5` is illegible.
 */
const VARIANTS: Record<DocumentActionVariant, VariantConfig> = {
  share: {
    pillLabel: 'Shared',
    pillColor: '#4A49A6',
    actorVar: 'person_name',
    verb: 'shared',
    showMessage: true,
    attachmentNote: false,
    preheader: 'A trade confirmation has been shared with you',
  },
  dispute: {
    pillLabel: 'Disputed',
    pillColor: '#ef4444',
    actorVar: 'organization_name',
    verb: 'disputed',
    showMessage: true,
    attachmentNote: false,
    preheader: 'A dispute has been raised on your trade confirmation',
  },
  return: {
    pillLabel: 'Signed',
    pillColor: '#10b981',
    actorVar: 'organization_name',
    verb: 'signed',
    showMessage: false,
    attachmentNote: true,
    preheader: 'You have received a signed trade confirmation',
  },
};

/**
 * Card rows, in display order. Labels follow the copy already used in
 * DisputeConfirm — the Float-side identifier is "Trade ID" and the other side
 * is "Counterparty Ref" — rather than the internal `party1`/`party2` model
 * vocabulary. `party1TradeId` is promoted into the card header instead.
 */
const ROW_SPECS: Array<{ label: string; key: keyof DocumentRow }> = [
  { label: 'Trade Date', key: 'tradeDate' },
  { label: 'Confirmation Date', key: 'confirmationDate' },
  { label: 'Counterparty Ref', key: 'party2TradeId' },
  { label: 'Counterparty Contract Ref', key: 'party2ContractId' },
  { label: 'Trade Type', key: 'tradeType' },
];

const DOCUMENT_BASE_URL = 'https://app.float.tech/documents';

// ---------------------------------------------------------------- styles ----

const pillStyle = (background: string): React.CSSProperties => ({
  display: 'inline-block',
  backgroundColor: background,
  color: '#ffffff',
  padding: '4px 10px',
  borderRadius: '999px',
  fontFamily: FONT,
  fontSize: '10px',
  fontWeight: 'bold',
  letterSpacing: '0.7px',
  textTransform: 'uppercase',
});

const headlineStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  margin: '16px 0 20px 0',
  color: '#111827',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 16px 0',
  color: '#374151',
};

const messageLabelStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '13px',
  fontWeight: 'bold',
  color: '#52525B',
  margin: '0 0 8px 0',
};

const messageBoxStyle: React.CSSProperties = {
  backgroundColor: '#f3f4f6',
  border: CELL_BORDER,
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '20px',
  fontFamily: FONT,
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#26262B',
};

const cardTableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#ffffff',
};

const cardHeaderStyle: React.CSSProperties = {
  padding: '10px 8px',
  borderTop: CELL_BORDER,
  borderLeft: CELL_BORDER,
  borderRight: CELL_BORDER,
  borderBottom: '4px solid #4a49a6',
  fontFamily: FONT,
  fontSize: '12px',
  fontWeight: 'normal',
  color: '#111827',
  backgroundColor: '#f9fafb',
  textAlign: 'left',
};

const labelCellStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderLeft: CELL_BORDER,
  borderRight: CELL_BORDER,
  borderBottom: CELL_BORDER,
  fontFamily: FONT,
  fontSize: '12px',
  fontWeight: 'normal',
  color: '#374151',
  backgroundColor: '#f9fafb',
  verticalAlign: 'top',
  width: '38%',
};

const valueCellStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderRight: CELL_BORDER,
  borderBottom: CELL_BORDER,
  fontFamily: FONT,
  fontSize: '12px',
  color: '#111827',
  verticalAlign: 'top',
  wordBreak: 'break-word',
};

const productStyle: React.CSSProperties = {
  color: '#6b7280',
  marginLeft: '12px',
};

const linkStyle: React.CSSProperties = {
  color: '#4A49A6',
  fontWeight: 'bold',
  textDecoration: 'none',
};

const emptyStateStyle: React.CSSProperties = {
  padding: '16px 8px',
  border: CELL_BORDER,
  fontFamily: FONT,
  fontSize: '12px',
  color: '#6b7280',
  textAlign: 'center',
};

// ------------------------------------------------------------ export mode ----

/**
 * Handlebars for SendGrid.
 *
 * Pluralization uses SendGrid's documented *block* helper form against an
 * explicit `document_count`. The subexpression form used elsewhere in this
 * codebase — `{{#if (gt trades.length 1)}}` — is not in SendGrid's documented
 * helper set, and if unsupported it evaluates falsy and silently renders the
 * singular for every send.
 */
const plural = (suffix = 's') =>
  `{{#greaterThan document_count 1}}${suffix}{{/greaterThan}}`;

const handlebarsBody = (variant: DocumentActionVariant): string => {
  const config = VARIANTS[variant];
  const actor = `{{${config.actorVar}}}`;

  const rows = ROW_SPECS.map(
    spec => `
              <tr>
                <td style="${css(labelCellStyle)}">${spec.label}</td>
                <td style="${css(valueCellStyle)}">{{#if this.${spec.key}}}{{this.${spec.key}}}{{else}}${EM_DASH_ENTITY}{{/if}}</td>
              </tr>`
  ).join('');

  return `
<span style="${css(pillStyle(config.pillColor))}">${config.pillLabel}</span>

<h1 style="${css(headlineStyle)}"><strong>${actor}</strong> ${config.verb} the following trade confirmation${plural()}</h1>
${
  config.attachmentNote
    ? `
<p style="${css(bodyStyle)}">The fully executed trade confirmation${plural()} {{#greaterThan document_count 1}}are{{/greaterThan}}{{#lessThan document_count 2}}is{{/lessThan}} attached to this email.</p>
`
    : ''
}${
    config.showMessage
      ? `
{{#if message}}
<p style="${css(messageLabelStyle)}">Message</p>
<div style="${css(messageBoxStyle)}">{{{message}}}</div>
{{/if}}
`
      : ''
  }
{{#each dynamic_table_data}}
<div style="margin-bottom: 24px;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="${css(cardTableStyle)}">
    <thead>
      <tr>
        <th colspan="2" style="${css(cardHeaderStyle)}">
          Trade ID: <strong>{{#if this.party1TradeId}}{{this.party1TradeId}}{{else}}${EM_DASH_ENTITY}{{/if}}</strong>
          {{#if this.productType}}<span style="${css(productStyle)}">{{this.productType}}</span>{{/if}}
        </th>
      </tr>
    </thead>
    <tbody>${rows}
      <tr>
        <td style="${css(labelCellStyle)}">Document</td>
        <td style="${css(valueCellStyle)}">{{#if this.documentId}}<a href="${DOCUMENT_BASE_URL}/{{this.documentId}}" target="_blank" style="${css(linkStyle)}">{{#if this.documentFileName}}{{this.documentFileName}}{{else}}View document{{/if}}</a>{{else}}${EM_DASH_ENTITY}{{/if}}</td>
      </tr>
    </tbody>
  </table>
</div>
{{else}}
<div style="${css(emptyStateStyle)}">No document details were provided.</div>
{{/each}}
`;
};

// ----------------------------------------------------------------- props ----

interface DocumentActionEmailProps {
  variant: DocumentActionVariant;
  /** Resolved actor name, or the raw `{{...}}` placeholder in export mode. */
  actorName: string;
  message?: string;
  documents?: DocumentRow[];
}

export const DocumentActionEmail: React.FC<DocumentActionEmailProps> = ({
  variant,
  actorName,
  message,
  documents = [],
}) => {
  const config = VARIANTS[variant];

  // Export mode is signalled by the actor still holding its Handlebars
  // placeholder. Detecting on `documents.length` instead would make the empty
  // state unreachable in the preview.
  const isPreviewMode = actorName !== `{{${config.actorVar}}}`;

  if (!isPreviewMode) {
    return (
      <EmailLayout preheader={config.preheader}>
        <div dangerouslySetInnerHTML={{ __html: handlebarsBody(variant) }} />
      </EmailLayout>
    );
  }

  const isPlural = documents.length !== 1;
  const hasMessage = Boolean(message) && message !== '{{message}}';

  return (
    <EmailLayout preheader={config.preheader}>
      <span style={pillStyle(config.pillColor)}>{config.pillLabel}</span>

      <h1 style={headlineStyle}>
        <strong>{actorName}</strong> {config.verb} the following trade
        confirmation{isPlural ? 's' : ''}
      </h1>

      {config.attachmentNote && (
        <p style={bodyStyle}>
          The fully executed trade confirmation{isPlural ? 's are' : ' is'}{' '}
          attached to this email.
        </p>
      )}

      {config.showMessage && hasMessage && (
        <>
          <p style={messageLabelStyle}>Message</p>
          <div
            style={messageBoxStyle}
            dangerouslySetInnerHTML={{ __html: message as string }}
          />
        </>
      )}

      {documents.length === 0 ? (
        <div style={emptyStateStyle}>No document details were provided.</div>
      ) : (
        documents.map((document, index) => (
          <div key={index} style={{ marginBottom: '24px' }}>
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              style={cardTableStyle}
            >
              <thead>
                <tr>
                  <th colSpan={2} style={cardHeaderStyle}>
                    Trade ID:{' '}
                    <strong>{document.party1TradeId || EM_DASH}</strong>
                    {document.productType && (
                      <span style={productStyle}>{document.productType}</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROW_SPECS.map(spec => (
                  <tr key={spec.key}>
                    <td style={labelCellStyle}>{spec.label}</td>
                    <td style={valueCellStyle}>
                      {document[spec.key] || EM_DASH}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={labelCellStyle}>Document</td>
                  <td style={valueCellStyle}>
                    {document.documentId ? (
                      <a
                        href={`${DOCUMENT_BASE_URL}/${document.documentId}`}
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle}
                      >
                        {document.documentFileName || 'View document'}
                      </a>
                    ) : (
                      EM_DASH
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </EmailLayout>
  );
};

export default DocumentActionEmail;
