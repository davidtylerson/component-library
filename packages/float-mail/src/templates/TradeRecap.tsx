import React from 'react';
import { EmailLayout } from '../react-email-src/components';

/**
 * TradeRecap
 *
 * The recap a dealer sends after execution: "here is what we just traded."
 * Unlike the affirmation email it asks for no verdict — the recipient's next
 * move is to book it — so there is no counterparty-economics column.
 *
 * A package puts one column per leg, so the legs of a structure line up field
 * by field and a reader can compare strikes and notionals across a row. A
 * single-leg trade is the same grid with one value column.
 *
 * Layout follows the real recaps this was modelled on: parties first (who
 * traded with whom, under which shortcodes), then the structure grid, then an
 * optional delta exchange grid for the hedge, then the booking CTA.
 *
 * Like the other Float templates this is dual-mode:
 *   - Preview mode (real data)  -> rendered with React for the in-app preview.
 *   - Export mode (no data)     -> emits raw Handlebars so SendGrid can loop
 *     over `legs`, `groups`, and `rows` at send time.
 */

const FONT_STACK = 'Helvetica-Neue, Helvetica, Arial, sans-serif';
const RULE = '#e5e7eb';
const WASH = '#f9fafb';
const GROUP_WASH = '#f3f4f6';
const BRAND = '#4a49a6';
const INK = '#111827';
const LABEL = '#374151';
const MUTED = '#6b7280';

/** Label column width in the parties block; keeps values aligned when stacked. */
const PARTY_LABEL_WIDTH = 150;

/** Column identity: one per leg of the package. */
interface RecapLeg {
  /** Float's computed trade name — the only trade naming we have. */
  trade_name: string;
  /** The dealer's trade identifier. We never have the client's own id. */
  dealer_trade_id: string;
  product_type: string;
  /** Position in a multi-leg package, e.g. "Leg 1 of 2". Omitted when single. */
  leg_label?: string;
}

/**
 * One row of the grid: a field name and its value in each leg's column.
 * `values` is positional — index n belongs to legs[n] — and a leg that doesn't
 * carry the field gets an empty string rather than a missing entry.
 */
interface RecapRow {
  field: string;
  values: string[];
}

interface RecapGroup {
  groupName: string;
  rows: RecapRow[];
}

interface TradeRecapProps {
  /** Dealer legal entity that executed, e.g. "Kestrel Bank London". */
  counterparty_name?: string;
  /** Dealer org/firm name — labels the row, e.g. "Goldman Sachs". */
  counterparty_org?: string;
  counterparty_shortcode?: string;
  /** Client legal entity, e.g. "Northbay Capital Master Fund LP". */
  client_name?: string;
  /** Client org/firm name — labels the row, e.g. "Northbay". */
  client_org?: string;
  client_shortcode?: string;
  /** Dealer-side salesperson; shown alongside the counterparty. */
  salesperson?: string;
  /** Client-side portfolio manager; shown alongside the client. */
  pm?: string;
  /** Preformatted execution time to the minute, e.g. "13 Aug 2026, 14:32 BST". */
  execution_time?: string;
  /** Product type of the structure; the title above the grid. */
  product_type?: string;
  legs?: RecapLeg[];
  groups?: RecapGroup[];
  /** Optional hedge, rendered under its own Delta exchange heading. */
  delta_exchange?: RecapGroup[];
  /** Column identities for the hedge grid; defaults to a single "Hedge" column. */
  delta_exchange_legs?: RecapLeg[];
  booking_url?: string;
}

/**
 * Header cell for one leg's column. The trade name and product type sit in the
 * title above the card, so the column only has to say which leg this is.
 */
const LegHeading: React.FC<{ leg: RecapLeg; idLabel?: string }> = ({
  leg,
  idLabel,
}) =>
  leg.dealer_trade_id ? (
    <span style={{ fontWeight: '400', fontSize: '11px', color: LABEL }}>
      {idLabel ? `${idLabel} ID: ` : 'ID: '}
      {leg.dealer_trade_id}
    </span>
  ) : (
    <span style={{ fontWeight: '600', fontSize: '10px', color: INK }}>
      {leg.leg_label || leg.trade_name}
    </span>
  );

/**
 * Title above the grid. Float has no computed name for a structure — dealers
 * don't name packages either — so the product type is the title, with the leg
 * count beside it.
 */
const GridTitle: React.FC<{ productType: string; legCount?: number }> = ({
  productType,
  legCount,
}) => (
  <p style={{ margin: '0 0 12px' }}>
    <span
      style={{
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '14px',
        fontWeight: 'bold',
        color: INK,
      }}
    >
      {productType}
    </span>
    {legCount ? (
      <span
        style={{
          fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
          fontSize: '12px',
          color: MUTED,
          marginLeft: '8px',
        }}
      >
        {legCount} {legCount === 1 ? 'leg' : 'legs'}
      </span>
    ) : null}
  </p>
);

/**
 * The structure grid: a field column plus one value column per leg.
 * Groups span the full width, so a package reads as one table rather than as
 * N tables the reader has to align by eye.
 */
const StructureGrid: React.FC<{
  legs: RecapLeg[];
  groups: RecapGroup[];
  /** Whose id the column header shows — the counterparty's shortcode. */
  idLabel?: string;
}> = ({ legs, groups, idLabel }) => {

  return (
    /* Scroll-wide: the outer fixed-layout table pins the scroll container to
       the card width (a fixed-layout table sizes to its parent, NOT to its
       content) so the inner auto-layout table can be wider and overflow-x
       pans it. A package with many legs scrolls rather than crushing every
       column. */
    <table
      role="presentation"
      border={0}
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={{
        width: '100%',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: 0 }} valign="top">
            <div
              style={{
                width: '100%',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <table
                style={{
                  borderCollapse: 'collapse',
                  width: 'auto',
                  minWidth: '100%',
                  tableLayout: 'auto',
                  backgroundColor: '#ffffff',
                }}
              >
      <thead>
        <tr>
          <th
            style={{
              padding: '5px 8px',
              borderTop: `1px solid ${RULE}`,
              borderLeft: `1px solid ${RULE}`,
              borderRight: `1px solid ${RULE}`,
              borderBottom: `2px solid ${BRAND}`,
              fontSize: '10px',
              fontWeight: '600',
              color: LABEL,
              backgroundColor: WASH,
              textAlign: 'left',
              verticalAlign: 'bottom',
              minWidth: '150px',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Corner cell: the row labels below need no column heading */}
            {'\u00a0'}
          </th>
          {legs.map((leg, legIndex) => (
            <th
              key={legIndex}
              style={{
                padding: '5px 8px',
                borderTop: `1px solid ${RULE}`,
                borderRight: `1px solid ${RULE}`,
                borderBottom: `2px solid ${BRAND}`,
                fontWeight: '400',
                backgroundColor: WASH,
                textAlign: 'left',
                verticalAlign: 'bottom',
                minWidth: '210px',
                whiteSpace: 'nowrap',
              }}
            >
              <LegHeading leg={leg} idLabel={idLabel} />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            <tr>
              <td
                style={{
                  padding: '4px 8px',
                  borderLeft: `1px solid ${RULE}`,
                  borderRight: `1px solid ${RULE}`,
                  borderBottom: `1px solid ${RULE}`,
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: INK,
                  backgroundColor: GROUP_WASH,
                  textAlign: 'left',
                }}
              >
                {group.groupName}
              </td>
              {legs.map((_, legIndex) => (
                <td
                  key={legIndex}
                  style={{
                    padding: '4px 8px',
                    borderRight: `1px solid ${RULE}`,
                    borderBottom: `1px solid ${RULE}`,
                    backgroundColor: GROUP_WASH,
                  }}
                >
                  &nbsp;
                </td>
              ))}
            </tr>

            {group.rows.map((row, rowIndex) => (
              <tr key={`${groupIndex}-${rowIndex}`}>
                <td
                  style={{
                    padding: '4px 8px',
                    borderLeft: `1px solid ${RULE}`,
                    borderRight: `1px solid ${RULE}`,
                    borderBottom: `1px solid ${RULE}`,
                    fontSize: '11px',
                    fontWeight: 'normal',
                    color: LABEL,
                    backgroundColor: WASH,
                    verticalAlign: 'top',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.field}
                </td>
                {legs.map((_, legIndex) => (
                  <td
                    key={legIndex}
                    style={{
                      padding: '4px 8px',
                      borderRight: `1px solid ${RULE}`,
                      borderBottom: `1px solid ${RULE}`,
                      fontSize: '11px',
                      color: INK,
                      verticalAlign: 'top',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.values[legIndex] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

/** One label/value row inside a parties block. */
const PartyRow: React.FC<{ label: string; value?: string }> = ({
  label,
  value,
}) => (
  <tr>
    {/* Fixed width, so the values line up across both blocks when stacked */}
    <td
      className="fl-label"
      width={PARTY_LABEL_WIDTH}
      style={{
        width: `${PARTY_LABEL_WIDTH}px`,
        padding: '3px 16px 3px 0',
        fontSize: '12px',
        color: MUTED,
        verticalAlign: 'top',
      }}
    >
      {label}
    </td>
    <td style={{ padding: '3px 0', fontSize: '12px', color: INK }}>
      <strong>{value}</strong>
    </td>
  </tr>
);

/**
 * Who traded with whom, and the contact on each side. Two blocks sit side by
 * side and collapse to stacked once there isn't room — at narrow widths the
 * four columns wrap into each other and become unreadable.
 */
const Parties: React.FC<{
  counterpartyOrg: string;
  counterpartyName: string;
  clientOrg: string;
  clientName: string;
  salesperson?: string;
  pm?: string;
}> = ({
  counterpartyOrg,
  counterpartyName,
  clientOrg,
  clientName,
  salesperson,
  pm,
}) => (
  <table
    role="presentation"
    cellSpacing="0"
    cellPadding="0"
    border={0}
    width="100%"
    style={{ borderCollapse: 'collapse', marginBottom: '32px' }}
  >
    <tbody>
      <tr>
        <td
          className="fl-stack"
          valign="top"
          style={{ verticalAlign: 'top', paddingRight: '24px' }}
        >
          <table
            role="presentation"
            cellSpacing="0"
            cellPadding="0"
            border={0}
            width="100%"
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              tableLayout: 'fixed',
            }}
          >
            <tbody>
              <PartyRow
                label={`${counterpartyOrg} Entity`}
                value={counterpartyName}
              />
              <PartyRow label={`${clientOrg} Entity`} value={clientName} />
            </tbody>
          </table>
        </td>
        {/* Salesperson lines up with the counterparty, PM with the client */}
        <td className="fl-stack" valign="top" style={{ verticalAlign: 'top' }}>
          <table
            role="presentation"
            cellSpacing="0"
            cellPadding="0"
            border={0}
            width="100%"
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              tableLayout: 'fixed',
            }}
          >
            <tbody>
              <PartyRow label="Salesperson" value={salesperson} />
              <PartyRow label="PM" value={pm} />
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
);

export const TradeRecap: React.FC<TradeRecapProps> = ({
  counterparty_name = '{{counterparty_name}}',
  counterparty_org = '{{counterparty_org}}',
  counterparty_shortcode = '{{counterparty_shortcode}}',
  client_name = '{{client_name}}',
  client_org = '{{client_org}}',
  salesperson = '{{salesperson}}',
  pm = '{{pm}}',
  execution_time = '{{execution_time}}',
  product_type = '{{product_type}}',
  legs = [] as RecapLeg[],
  groups = [] as RecapGroup[],
  delta_exchange,
  delta_exchange_legs,
  booking_url = '{{booking_url}}',
}) => {
  const isPreviewMode = Array.isArray(legs) && legs.length > 0;

  if (!isPreviewMode) {
    // -------- Export mode: raw Handlebars for SendGrid --------
    //
    // The grid is emitted already pivoted: `legs` are the columns and each row
    // carries one `values` entry per leg. Handlebars can't transpose a
    // leg-major payload into columns (no index arithmetic inside {{#each}}),
    // so the pivot has to arrive done. Group rows emit one cell per column
    // rather than using colspan, so no computed span variable is required.
    return (
      <EmailLayout preheader="Trade recap — ready to book." maxWidth="100%">
        <div
          dangerouslySetInnerHTML={{
            __html: `
<h1 style="color: ${INK}; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 1.2; margin: 0 0 4px;">Trade recap</h1>
<p style="color: ${MUTED}; font-family: Helvetica-Neue, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.4; margin: 0 0 24px;">{{execution_time}}</p>

{{! ---- Parties: who executed with whom, with both shortcodes ---- }}
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: collapse; margin-bottom: 32px;">
  <tr>
    <td class="fl-stack" valign="top" style="vertical-align: top; padding-right: 24px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: collapse; width: 100%; table-layout: fixed;">
        <tr>
          <td class="fl-label" width="${PARTY_LABEL_WIDTH}" style="width: ${PARTY_LABEL_WIDTH}px; padding: 3px 16px 3px 0; font-size: 12px; color: ${MUTED}; vertical-align: top;">{{counterparty_org}} Entity</td>
          <td style="padding: 3px 0; font-size: 12px; color: ${INK};"><strong>{{counterparty_name}}</strong></td>
        </tr>
        <tr>
          <td class="fl-label" width="${PARTY_LABEL_WIDTH}" style="width: ${PARTY_LABEL_WIDTH}px; padding: 3px 16px 3px 0; font-size: 12px; color: ${MUTED}; vertical-align: top;">{{client_org}} Entity</td>
          <td style="padding: 3px 0; font-size: 12px; color: ${INK};"><strong>{{client_name}}</strong></td>
        </tr>
      </table>
    </td>
    <td class="fl-stack" valign="top" style="vertical-align: top;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: collapse; width: 100%; table-layout: fixed;">
        <tr>
          <td class="fl-label" width="${PARTY_LABEL_WIDTH}" style="width: ${PARTY_LABEL_WIDTH}px; padding: 3px 16px 3px 0; font-size: 12px; color: ${MUTED}; vertical-align: top;">Salesperson</td>
          <td style="padding: 3px 0; font-size: 12px; color: ${INK};"><strong>{{salesperson}}</strong></td>
        </tr>
        <tr>
          <td class="fl-label" width="${PARTY_LABEL_WIDTH}" style="width: ${PARTY_LABEL_WIDTH}px; padding: 3px 16px 3px 0; font-size: 12px; color: ${MUTED}; vertical-align: top;">PM</td>
          <td style="padding: 3px 0; font-size: 12px; color: ${INK};"><strong>{{pm}}</strong></td>
        </tr>
      </table>
    </td>
  </tr>
</table>

{{! ---- Structure title, outside the card ---- }}
<p style="margin: 0 0 12px;"><span style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; color: ${INK};">{{product_type}}</span>{{#if leg_count}}<span style="font-family: Helvetica-Neue, Helvetica, Arial, sans-serif; font-size: 12px; color: ${MUTED}; margin-left: 8px;">{{leg_count}} legs</span>{{/if}}</p>

{{! ---- Structure grid: field column + one column per leg ---- }}
<table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; table-layout: fixed; border-collapse: collapse;">
  <tr>
    <td style="padding: 0;" valign="top">
      <div style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table style="border-collapse: collapse; width: auto; min-width: 100%; table-layout: auto; background-color: #ffffff;">
  <thead>
    <tr>
      <th style="padding: 5px 8px; border-top: 1px solid ${RULE}; border-left: 1px solid ${RULE}; border-right: 1px solid ${RULE}; border-bottom: 2px solid ${BRAND}; font-size: 10px; font-weight: 600; color: ${LABEL}; background-color: ${WASH}; text-align: left; vertical-align: bottom; min-width: 150px; white-space: nowrap;">&nbsp;</th>
      {{#each legs}}
      <th style="padding: 5px 8px; border-top: 1px solid ${RULE}; border-right: 1px solid ${RULE}; border-bottom: 2px solid ${BRAND}; font-weight: 400; background-color: ${WASH}; text-align: left; vertical-align: bottom; min-width: 210px; white-space: nowrap;">
        {{#if this.dealer_trade_id}}<span style="font-weight: 400; font-size: 11px; color: ${LABEL};">{{#if ../counterparty_shortcode}}{{../counterparty_shortcode}} {{/if}}ID: {{this.dealer_trade_id}}</span>{{else}}<span style="font-weight: 600; font-size: 10px; color: ${INK};">{{#if this.leg_label}}{{this.leg_label}}{{else}}{{this.trade_name}}{{/if}}</span>{{/if}}
      </th>
      {{/each}}
    </tr>
  </thead>
  <tbody>
    {{#each groups}}
    <tr>
      <td style="padding: 4px 8px; border-left: 1px solid ${RULE}; border-right: 1px solid ${RULE}; border-bottom: 1px solid ${RULE}; font-size: 11px; font-weight: bold; color: ${INK}; background-color: ${GROUP_WASH}; text-align: left;">{{this.groupName}}</td>
      {{#each ../legs}}
      <td style="padding: 4px 8px; border-right: 1px solid ${RULE}; border-bottom: 1px solid ${RULE}; font-size: 11px; font-weight: bold; color: ${INK}; background-color: ${GROUP_WASH}; text-align: left;">&nbsp;</td>
      {{/each}}
    </tr>
    {{#each this.rows}}
    <tr>
      <td style="padding: 4px 8px; border-left: 1px solid ${RULE}; border-right: 1px solid ${RULE}; border-bottom: 1px solid ${RULE}; font-size: 11px; color: ${LABEL}; background-color: ${WASH}; vertical-align: top; white-space: nowrap;">{{this.field}}</td>
      {{#each this.values}}
      <td style="padding: 4px 8px; border-right: 1px solid ${RULE}; border-bottom: 1px solid ${RULE}; font-size: 11px; color: ${INK}; vertical-align: top; white-space: nowrap;">{{this}}</td>
      {{/each}}
    </tr>
    {{/each}}
    {{/each}}
  </tbody>
        </table>
      </div>
    </td>
  </tr>
</table>

{{! ---- Delta exchange: the hedge, under its own heading ---- }}
{{#if delta_exchange}}
<h2 style="color: ${INK}; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; margin: 32px 0 12px;">Delta exchange</h2>
<table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; table-layout: fixed; border-collapse: collapse;">
  <tr>
    <td style="padding: 0;" valign="top">
      <div style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table style="border-collapse: collapse; width: auto; min-width: 100%; table-layout: auto; background-color: #ffffff;">
  <thead>
    <tr>
      <th style="padding: 5px 8px; border-top: 1px solid ${RULE}; border-left: 1px solid ${RULE}; border-right: 1px solid ${RULE}; border-bottom: 2px solid ${BRAND}; font-size: 10px; font-weight: 600; color: ${LABEL}; background-color: ${WASH}; text-align: left; vertical-align: bottom; min-width: 150px; white-space: nowrap;">&nbsp;</th>
      {{#each delta_exchange_legs}}
      <th style="padding: 5px 8px; border-top: 1px solid ${RULE}; border-right: 1px solid ${RULE}; border-bottom: 2px solid ${BRAND}; font-weight: 400; background-color: ${WASH}; text-align: left; vertical-align: bottom; min-width: 210px; white-space: nowrap;">
        {{#if this.dealer_trade_id}}<span style="font-weight: 400; font-size: 11px; color: ${LABEL};">{{#if ../counterparty_shortcode}}{{../counterparty_shortcode}} {{/if}}ID: {{this.dealer_trade_id}}</span>{{else}}<span style="font-weight: 600; font-size: 10px; color: ${INK};">{{this.trade_name}}</span>{{/if}}
      </th>
      {{/each}}
    </tr>
  </thead>
  <tbody>
    {{#each delta_exchange}}
    <tr>
      <td style="padding: 4px 8px; border-left: 1px solid ${RULE}; border-right: 1px solid ${RULE}; border-bottom: 1px solid ${RULE}; font-size: 11px; font-weight: bold; color: ${INK}; background-color: ${GROUP_WASH}; text-align: left;">{{this.groupName}}</td>
      {{#each ../delta_exchange_legs}}
      <td style="padding: 4px 8px; border-right: 1px solid ${RULE}; border-bottom: 1px solid ${RULE}; font-size: 11px; font-weight: bold; color: ${INK}; background-color: ${GROUP_WASH}; text-align: left;">&nbsp;</td>
      {{/each}}
    </tr>
    {{#each this.rows}}
    <tr>
      <td style="padding: 4px 8px; border-left: 1px solid ${RULE}; border-right: 1px solid ${RULE}; border-bottom: 1px solid ${RULE}; font-size: 11px; color: ${LABEL}; background-color: ${WASH}; vertical-align: top; white-space: nowrap;">{{this.field}}</td>
      {{#each this.values}}
      <td style="padding: 4px 8px; border-right: 1px solid ${RULE}; border-bottom: 1px solid ${RULE}; font-size: 11px; color: ${INK}; vertical-align: top; white-space: nowrap;">{{this}}</td>
      {{/each}}
    </tr>
    {{/each}}
    {{/each}}
  </tbody>
        </table>
      </div>
    </td>
  </tr>
</table>
{{/if}}
`,
          }}
        />

        <div style={{ height: '32px', lineHeight: '32px', fontSize: 0 }}>
          &nbsp;
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: separate; width: 100%;">
  <tr>
    <td align="center" bgcolor="#4A49A6" style="border-radius: 8px; background-color: #4A49A6;">
      <a href="{{booking_url}}" target="_blank" style="display: block; padding: 12px 24px; font-family: ${FONT_STACK}; font-size: 16px; font-weight: normal; color: #ffffff; text-decoration: none; text-align: center; border-radius: 8px;">Start booking</a>
    </td>
  </tr>
</table>
`,
          }}
        />
      </EmailLayout>
    );
  }

  // -------- Preview mode: React rendering of real data --------
  const isPackage = legs.length > 1;
  const idLabel =
    counterparty_shortcode && counterparty_shortcode !== '{{counterparty_shortcode}}'
      ? counterparty_shortcode
      : undefined;
  const hedgeLegs: RecapLeg[] = delta_exchange_legs?.length
    ? delta_exchange_legs
    : [{ trade_name: 'Hedge', product_type: '', dealer_trade_id: '' }];

  return (
    <EmailLayout
      preheader={`Trade recap — ${legs.length} ${
        isPackage ? 'legs' : 'leg'
      } ready to book.`}
      maxWidth="100%"
    >
      <h1
        style={{
          color: INK,
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '24px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          margin: '0 0 4px',
        }}
      >
        Trade recap
      </h1>

      <p
        style={{
          color: MUTED,
          fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
          fontSize: '13px',
          lineHeight: '1.4',
          margin: '0 0 24px',
        }}
      >
        {execution_time}
      </p>

      <Parties
        counterpartyOrg={counterparty_org}
        counterpartyName={counterparty_name}
        clientOrg={client_org}
        clientName={client_name}
        salesperson={salesperson}
        pm={pm}
      />

      <GridTitle
        productType={product_type || legs[0]?.product_type || ''}
        legCount={legs.length}
      />
      <StructureGrid legs={legs} groups={groups} idLabel={idLabel} />

      {delta_exchange && delta_exchange.length > 0 && (
        <>
          <h2
            style={{
              color: INK,
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: '14px',
              fontWeight: 'bold',
              margin: '32px 0 12px',
            }}
          >
            Delta exchange
          </h2>
          <StructureGrid legs={hedgeLegs} groups={delta_exchange} idLabel={idLabel} />
        </>
      )}

      <div style={{ height: '32px', lineHeight: '32px', fontSize: 0 }}>
        &nbsp;
      </div>

      <table
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
        width="100%"
        style={{ borderCollapse: 'separate', width: '100%' }}
      >
        <tbody>
          <tr>
            <td
              align="center"
              style={{ borderRadius: '8px', backgroundColor: '#4A49A6' }}
            >
              <a
                href={booking_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  padding: '12px 24px',
                  fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'normal',
                  color: '#ffffff',
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: '8px',
                }}
              >
                Start booking
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </EmailLayout>
  );
};

export default TradeRecap;
