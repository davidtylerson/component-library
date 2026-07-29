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
 * Field labels and section headings mirror the emails currently in production
 * rather than the older templates in this package, which have drifted from
 * what actually ships.
 *
 * Like the other Float templates this is dual-mode:
 *   - Preview mode (real data) -> rendered with React for the in-app preview.
 *   - Export mode (no data)    -> emits raw Handlebars so SendGrid can loop
 *     over `dynamic_table_data` at send time.
 *
 * Both branches are generated from the same `rowSpecs()` output and the same
 * style objects, serialized to inline CSS by `css()`. That is deliberate:
 * hand-maintaining two copies of this markup is how the branches drift apart,
 * and a drifted export branch is invisible in the preview.
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
  /** The dealer-side reference. Surfaces as "Dealer Reference". */
  party1TradeId?: string;
  /** The client-side trade id. Surfaces as "<Org> Trade ID". */
  party2TradeId?: string;
  /** The client-side contract id. Promoted into the card header. */
  party2ContractId?: string;
  tradeDate?: string;
  confirmationDate?: string;
  tradeType?: string;
  productType?: string;
}

export type DocumentActionVariant = 'share' | 'dispute' | 'return';

interface VariantConfig {
  /** Handlebars variable holding the actor name, used for export-mode output. */
  actorVar: string;
  /** Headline for one document and for many. `%s` is replaced by the actor. */
  headlineOne: string;
  headlineMany: string;
  /** Heading above the message block, or null when the variant has no message. */
  messageHeading: string | null;
  /** Whether to state that the executed confirmation is attached. */
  attachmentNote: boolean;
  preheader: string;
}

/**
 * A human shares documents; an institution disputes or returns a confirmation.
 * Hence `person_name` for share and `organization_name` for the other two.
 *
 * Headline wording follows the emails in production today, pluralized end to
 * end — "a dispute ... your trade confirmation" becomes "disputes ... your
 * trade confirmations" rather than only pluralizing the trailing noun.
 */
const VARIANTS: Record<DocumentActionVariant, VariantConfig> = {
  share: {
    actorVar: 'person_name',
    headlineOne: '%s shared the following trade confirmation',
    headlineMany: '%s shared the following trade confirmations',
    messageHeading: 'Message',
    attachmentNote: false,
    preheader: 'A trade confirmation has been shared with you',
  },
  dispute: {
    actorVar: 'organization_name',
    headlineOne: '%s has raised a dispute with your trade confirmation',
    headlineMany: '%s has raised disputes with your trade confirmations',
    messageHeading: 'Dispute Details',
    attachmentNote: false,
    preheader: 'A dispute has been raised on your trade confirmation',
  },
  return: {
    actorVar: 'organization_name',
    headlineOne: 'You have received a signed trade confirmation from %s',
    headlineMany: 'You have received signed trade confirmations from %s',
    messageHeading: null,
    attachmentNote: true,
    preheader: 'You have received a signed trade confirmation',
  },
};

const TRADE_DETAILS_HEADING = 'Trade Details';
const DOCUMENT_ROW_LABEL = 'Document Link';

/** Label prefix when no organization name is available. */
const FALLBACK_ORG_LABEL = 'Client';

/**
 * Card rows, in the order the production return email shows them: identifiers,
 * then dates and type, then the counterparty reference. The production dispute
 * email happens to list the same fields alphabetically instead; that ordering
 * can't be reproduced anyway once the client-side labels carry a dynamic org
 * prefix, so one deliberate order is used for all three variants.
 *
 * `party2ContractId` is absent because it is promoted into the card header.
 */
const rowSpecs = (
  orgLabel: string
): Array<{ label: string; key: keyof DocumentRow }> => [
  { label: `${orgLabel} Trade ID`, key: 'party2TradeId' },
  { label: 'Trade Date', key: 'tradeDate' },
  { label: 'Trade Type', key: 'tradeType' },
  { label: 'Confirmation Date', key: 'confirmationDate' },
  { label: 'Dealer Reference', key: 'party1TradeId' },
];

const DOCUMENT_BASE_URL = 'https://app.float.tech/documents';

// ---------------------------------------------------------------- styles ----

const headlineStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  margin: '0 0 20px 0',
  color: '#111827',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 16px 0',
  color: '#374151',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  margin: '24px 0 12px 0',
  color: '#52525B',
};

const messageBoxStyle: React.CSSProperties = {
  backgroundColor: '#f3f4f6',
  border: CELL_BORDER,
  borderRadius: '8px',
  // `message` arrives as rich HTML and is normally wrapped in a <p>, whose
  // default ~1em margins stack on top of this padding. Vertical padding is
  // kept small so the combined inset matches the single-document dispute
  // email rather than doubling up on it.
  padding: '4px 16px',
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
  fontWeight: 'bold',
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
 * Plural copy is selected by testing for a *second* array element rather than
 * by comparing a count. This needs no extra payload field and relies only on
 * `{{#if}}`/`{{else}}` and array index access, both of which SendGrid supports.
 *
 * The obvious alternative — `{{#if (gt dynamic_table_data.length 1)}}`, the
 * form used elsewhere in this codebase — is a subexpression, which is not in
 * SendGrid's documented helper set; if unsupported it evaluates falsy and
 * silently renders the singular for every send.
 */
const pluralized = (one: string, many: string) =>
  `{{#if dynamic_table_data.[1]}}${many}{{else}}${one}{{/if}}`;

/**
 * Org name with a fallback, for the Handlebars label prefixes.
 *
 * Uses `../` because every use site is inside `{{#each dynamic_table_data}}`,
 * where a bare `{{organization_name}}` resolves against the row rather than the
 * payload root — it would silently fall through to the generic label on every
 * send while the React preview showed the real org name.
 */
const HB_ORG_LABEL = `{{#if ../organization_name}}{{../organization_name}}{{else}}${FALLBACK_ORG_LABEL}{{/if}}`;

const handlebarsBody = (variant: DocumentActionVariant): string => {
  const config = VARIANTS[variant];
  const actor = `{{${config.actorVar}}}`;

  const rows = rowSpecs(HB_ORG_LABEL)
    .map(
      spec => `
              <tr>
                <td style="${css(labelCellStyle)}">${spec.label}</td>
                <td style="${css(valueCellStyle)}">{{#if this.${spec.key}}}{{this.${spec.key}}}{{else}}${EM_DASH_ENTITY}{{/if}}</td>
              </tr>`
    )
    .join('');

  return `
<h1 style="${css(headlineStyle)}">${pluralized(
    config.headlineOne.replace('%s', `<strong>${actor}</strong>`),
    config.headlineMany.replace('%s', `<strong>${actor}</strong>`)
  )}</h1>
${
  config.attachmentNote
    ? `
<p style="${css(bodyStyle)}">${pluralized(
        'Please find your fully executed trade confirmation attached to this email.',
        'Please find your fully executed trade confirmations attached to this email.'
      )}</p>
`
    : ''
}${
    config.messageHeading
      ? `
{{#if message}}
<h2 style="${css(sectionHeadingStyle)}">${config.messageHeading}</h2>
<div style="${css(messageBoxStyle)}">{{{message}}}</div>
{{/if}}
`
      : ''
  }
<h2 style="${css(sectionHeadingStyle)}">${TRADE_DETAILS_HEADING}</h2>

{{#each dynamic_table_data}}
<div style="margin-bottom: 24px;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="${css(cardTableStyle)}">
    <thead>
      <tr>
        <th colspan="2" style="${css(cardHeaderStyle)}">
          ${HB_ORG_LABEL} Contract ID: <strong>{{#if this.party2ContractId}}{{this.party2ContractId}}{{else}}${EM_DASH_ENTITY}{{/if}}</strong>
          {{#if this.productType}}<span style="${css(productStyle)}">{{this.productType}}</span>{{/if}}
        </th>
      </tr>
    </thead>
    <tbody>${rows}
      <tr>
        <td style="${css(labelCellStyle)}">${DOCUMENT_ROW_LABEL}</td>
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
  /**
   * Organization the client-side identifiers belong to. Prefixes the
   * "<Org> Contract ID" / "<Org> Trade ID" labels. For Dispute and Return this
   * is the same value as `actorName`; for Share the actor is a person, so the
   * org is passed separately and falls back to a generic label when absent.
   */
  organizationName?: string;
  message?: string;
  documents?: DocumentRow[];
}

export const DocumentActionEmail: React.FC<DocumentActionEmailProps> = ({
  variant,
  actorName,
  organizationName,
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
  const orgLabel =
    organizationName && organizationName !== '{{organization_name}}'
      ? organizationName
      : FALLBACK_ORG_LABEL;
  const specs = rowSpecs(orgLabel);

  // Split the headline on the actor placeholder so the name can be bolded.
  const headline = isPlural ? config.headlineMany : config.headlineOne;
  const [beforeActor, afterActor] = headline.split('%s');

  return (
    <EmailLayout preheader={config.preheader}>
      <h1 style={headlineStyle}>
        {beforeActor}
        <strong>{actorName}</strong>
        {afterActor}
      </h1>

      {config.attachmentNote && (
        <p style={bodyStyle}>
          {isPlural
            ? 'Please find your fully executed trade confirmations attached to this email.'
            : 'Please find your fully executed trade confirmation attached to this email.'}
        </p>
      )}

      {config.messageHeading && hasMessage && (
        <>
          <h2 style={sectionHeadingStyle}>{config.messageHeading}</h2>
          <div
            style={messageBoxStyle}
            dangerouslySetInnerHTML={{ __html: message as string }}
          />
        </>
      )}

      <h2 style={sectionHeadingStyle}>{TRADE_DETAILS_HEADING}</h2>

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
                    {orgLabel} Contract ID:{' '}
                    <strong>{document.party2ContractId || EM_DASH}</strong>
                    {document.productType && (
                      <span style={productStyle}>{document.productType}</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {specs.map(spec => (
                  <tr key={spec.key}>
                    <td style={labelCellStyle}>{spec.label}</td>
                    <td style={valueCellStyle}>
                      {document[spec.key] || EM_DASH}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={labelCellStyle}>{DOCUMENT_ROW_LABEL}</td>
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
