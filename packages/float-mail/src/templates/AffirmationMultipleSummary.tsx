import React from 'react';
import {
  EmailLayout,
  PageTitle,
  SectionTitle,
  BodyText,
  MD,
  LG,
} from '../react-email-src/components';

interface TradeField {
  field: string;
  value: string;
  counterparty?: string;
}

interface TradeGroup {
  groupName: string;
  rows: TradeField[];
}

interface OriginalTradeReference {
  tradeId: string;
  productType?: string;
  rows: TradeField[];
}

interface Trade {
  tradeId: string;
  productType: string;
  tradeDate?: string;
  groups: TradeGroup[];
  originalTrade?: OriginalTradeReference;
}

interface AffirmationMultipleSummaryProps {
  organization_name: string;
  short_name: string;
  trades: Trade[];
}

function extractTradeDate(trade: Trade): string {
  const tradeTerms = trade.groups.find(g => g.groupName === 'Trade Terms');
  if (!tradeTerms) return '';
  const tradeDateRow = tradeTerms.rows.find(r => r.field === 'Trade Date');
  return tradeDateRow?.value || '';
}

const cellBorder = '1px solid #e5e7eb';

export const AffirmationMultipleSummary: React.FC<
  AffirmationMultipleSummaryProps
> = ({
  organization_name = '{{organization_name}}',
  short_name = '{{short_name}}',
  trades = [],
}) => {
  const isPreviewMode = organization_name !== '{{organization_name}}';
  const clientIdLabel = isPreviewMode
    ? `${short_name} ID`
    : '{{short_name}} ID';

  return (
    <EmailLayout preheader="Trade affirmation required">
      {isPreviewMode ? (
        <PageTitle>
          Trade Affirmation{trades.length !== 1 ? 's' : ''} Required
        </PageTitle>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: `<h1 style="font-size:24px;font-weight:bold;line-height:1.2;margin:0 0 20px 0;color:#111827">Trade Affirmation{{#if (gt trades.length 1)}}s{{/if}} Required</h1>`,
          }}
        />
      )}

      {isPreviewMode ? (
        <BodyText>
          <span style={{ fontWeight: 'bold' }}>{organization_name}</span> is
          requesting your affirmation of the following trade
          {trades.length !== 1 ? 's' : ''}. Please review the detailed trade
          information provided below.
        </BodyText>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <p style="font-size: 14px; line-height: 1.5; margin: 0 0 12px 0; color: #374151;">
                <span style="font-weight: bold;">{{organization_name}}</span> is
                requesting your affirmation of the following trade{{#if (gt trades.length 1)}}s{{/if}}. Please review
                the detailed trade information provided below.
              </p>
            `,
          }}
        />
      )}

      <MD />

      <PageTitle>Action Required:</PageTitle>

      <BodyText>
        1. Review each trade in the summary table below.
        <br />
        2. Enter your ID for each trade.
        <br />
        3. Set Affirmation Status to{' '}
        <span style={{ fontWeight: 'bold' }}>AFFIRMED</span> or{' '}
        <span style={{ fontWeight: 'bold' }}>DISPUTED</span>.
        <br />
        4. If disputed, use the detailed trade tables below to note any
        discrepancies in the Counterparty Economics column.
      </BodyText>

      <LG />

      {/* Summary Table */}
      <SectionTitle>Summary</SectionTitle>

      <MD />

      {isPreviewMode ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff',
          }}
        >
          <thead>
            <tr>
              {[
                clientIdLabel,
                'Product',
                'Trade Date',
                'Your ID',
                'Affirmation Status',
              ].map(header => (
                <th
                  key={header}
                  style={{
                    padding: '6px 8px',
                    borderTop: cellBorder,
                    borderLeft: cellBorder,
                    borderRight: cellBorder,
                    borderBottom: cellBorder,
                    fontSize: '10px',
                    fontWeight: '600',
                    color: '#374151',
                    backgroundColor: '#f9fafb',
                    textAlign: 'left',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: '6px 8px',
                    borderLeft: cellBorder,
                    borderRight: cellBorder,
                    borderBottom: cellBorder,
                    fontSize: '10px',
                    color: '#111827',
                  }}
                >
                  {trade.tradeId}
                </td>
                <td
                  style={{
                    padding: '6px 8px',
                    borderRight: cellBorder,
                    borderBottom: cellBorder,
                    fontSize: '10px',
                    color: '#111827',
                  }}
                >
                  {trade.productType}
                </td>
                <td
                  style={{
                    padding: '6px 8px',
                    borderRight: cellBorder,
                    borderBottom: cellBorder,
                    fontSize: '10px',
                    color: '#111827',
                  }}
                >
                  {trade.tradeDate || extractTradeDate(trade)}
                </td>
                <td
                  style={{
                    padding: '6px 8px',
                    borderRight: cellBorder,
                    borderBottom: cellBorder,
                    fontSize: '10px',
                    color: '#6b7280',
                  }}
                />
                <td
                  style={{
                    padding: '6px 8px',
                    borderRight: cellBorder,
                    borderBottom: cellBorder,
                    fontSize: '10px',
                    color: '#6b7280',
                  }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                <thead>
                  <tr>
                    <th style="padding: 6px 8px; border: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left;">{{short_name}} ID</th>
                    <th style="padding: 6px 8px; border: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left;">Product</th>
                    <th style="padding: 6px 8px; border: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left;">Trade Date</th>
                    <th style="padding: 6px 8px; border: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left;">Your ID</th>
                    <th style="padding: 6px 8px; border: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left;">Affirmation Status</th>
                  </tr>
                </thead>
                <tbody>
                  {{#each trades}}
                  <tr>
                    <td style="padding: 6px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #111827;">{{tradeId}}</td>
                    <td style="padding: 6px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #111827;">{{productType}}</td>
                    <td style="padding: 6px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #111827;">{{tradeDate}}</td>
                    <td style="padding: 6px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #6b7280;"></td>
                    <td style="padding: 6px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #6b7280;"></td>
                  </tr>
                  {{/each}}
                </tbody>
              </table>
            `,
          }}
        />
      )}

      <LG />

      <SectionTitle>Trade Details</SectionTitle>

      <MD />

      {isPreviewMode ? (
        trades.map((trade, tradeIndex) => (
          <div key={tradeIndex} style={{ marginBottom: '32px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#ffffff',
              }}
            >
              <thead>
                <tr>
                  <th
                    colSpan={3}
                    style={{
                      padding: '10px 8px',
                      borderTop: cellBorder,
                      borderLeft: cellBorder,
                      borderRight: cellBorder,
                      borderBottom: '4px solid #4a49a6',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#111827',
                      backgroundColor: '#f9fafb',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: '400',
                        fontSize: '12px',
                        color: '#111827',
                      }}
                    >
                      {short_name} ID: <strong>{trade.tradeId}</strong>
                    </span>
                    <span
                      style={{
                        fontWeight: '400',
                        color: '#6b7280',
                        marginLeft: '12px',
                      }}
                    >
                      {trade.productType}
                    </span>
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      padding: '4px 8px',
                      borderLeft: cellBorder,
                      borderRight: cellBorder,
                      borderBottom: cellBorder,
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#374151',
                      backgroundColor: '#f9fafb',
                      textAlign: 'left',
                      width: '30%',
                    }}
                  >
                    Field
                  </th>
                  <th
                    style={{
                      padding: '4px 8px',
                      borderRight: cellBorder,
                      borderBottom: cellBorder,
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#374151',
                      backgroundColor: '#f9fafb',
                      textAlign: 'left',
                      width: '35%',
                    }}
                  >
                    Value
                  </th>
                  <th
                    style={{
                      padding: '4px 8px',
                      borderRight: cellBorder,
                      borderBottom: cellBorder,
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#374151',
                      backgroundColor: '#f9fafb',
                      textAlign: 'left',
                      width: '35%',
                    }}
                  >
                    Counterparty Economics (if disputed)
                  </th>
                </tr>
              </thead>

              <tbody>
                {trade.groups.map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          padding: '4px 8px',
                          borderLeft: cellBorder,
                          borderRight: cellBorder,
                          borderBottom: cellBorder,
                          fontSize: '10px',
                          fontWeight: 'bold',
                          color: '#111827',
                          backgroundColor: '#f3f4f6',
                          textAlign: 'left',
                        }}
                      >
                        {group.groupName}
                      </td>
                    </tr>

                    {group.rows.map((row, rowIndex) => (
                      <tr key={`${groupIndex}-${rowIndex}`}>
                        <td
                          style={{
                            padding: '4px 8px',
                            borderLeft: cellBorder,
                            borderRight: cellBorder,
                            borderBottom: cellBorder,
                            fontSize: '10px',
                            fontWeight: 'normal',
                            color: '#374151',
                            backgroundColor: '#f9fafb',
                            verticalAlign: 'top',
                          }}
                        >
                          {row.field}
                        </td>
                        <td
                          style={{
                            padding: '4px 8px',
                            borderRight: cellBorder,
                            borderBottom: cellBorder,
                            fontSize: '10px',
                            color: '#111827',
                            verticalAlign: 'top',
                            wordBreak: 'break-word',
                          }}
                        >
                          {row.value}
                        </td>
                        <td
                          style={{
                            padding: '4px 8px',
                            borderRight: cellBorder,
                            borderBottom: cellBorder,
                            fontSize: '10px',
                            color: '#6b7280',
                            verticalAlign: 'top',
                            wordBreak: 'break-word',
                          }}
                        >
                          {row.counterparty || ''}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {trade.originalTrade && (
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: '#ffffff',
                  marginTop: '8px',
                }}
              >
                <thead>
                  <tr>
                    <th
                      colSpan={2}
                      style={{
                        padding: '10px 8px',
                        borderTop: cellBorder,
                        borderLeft: cellBorder,
                        borderRight: cellBorder,
                        borderBottom: cellBorder,
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#111827',
                        backgroundColor: '#f9fafb',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: '400',
                          fontSize: '12px',
                          color: '#111827',
                        }}
                      >
                        Original Trade:{' '}
                        <strong>{trade.originalTrade.tradeId}</strong>
                      </span>
                      {trade.originalTrade.productType && (
                        <span
                          style={{
                            fontWeight: '400',
                            color: '#6b7280',
                            marginLeft: '12px',
                          }}
                        >
                          {trade.originalTrade.productType}
                        </span>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trade.originalTrade.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td
                        style={{
                          padding: '4px 8px',
                          borderLeft: cellBorder,
                          borderRight: cellBorder,
                          borderBottom: cellBorder,
                          fontSize: '10px',
                          fontWeight: 'normal',
                          color: '#374151',
                          backgroundColor: '#f9fafb',
                          verticalAlign: 'top',
                          width: '30%',
                        }}
                      >
                        {row.field}
                      </td>
                      <td
                        style={{
                          padding: '4px 8px',
                          borderRight: cellBorder,
                          borderBottom: cellBorder,
                          fontSize: '10px',
                          color: '#111827',
                          verticalAlign: 'top',
                          wordBreak: 'break-word',
                        }}
                      >
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: `
              {{#each trades}}
              <div style="margin-bottom: 32px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                  <thead>
                    <tr>
                      <th colspan="3" style="padding: 10px 8px; border-top: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 4px solid #4a49a6; font-size: 11px; font-weight: 600; color: #111827; background-color: #f9fafb; text-align: left;">
                        <span style="font-weight: 400; font-size: 12px; color: #111827;">
                          {{short_name}} ID: <strong>{{tradeId}}</strong>
                        </span>
                        <span style="font-weight: 400; color: #6b7280; margin-left: 12px;">
                          {{productType}}
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 30%;">
                        Field
                      </th>
                      <th style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 35%;">
                        Value
                      </th>
                      <th style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 35%;">
                        Counterparty Economics (if disputed)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {{#each groups}}
                    <tr>
                      <td colspan="3" style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: bold; color: #111827; background-color: #f3f4f6; text-align: left;">
                        {{groupName}}
                      </td>
                    </tr>
                    {{#each rows}}
                    <tr>
                      <td style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: normal; color: #374151; background-color: #f9fafb; vertical-align: top;">
                        {{field}}
                      </td>
                      <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #111827; vertical-align: top; word-break: break-word;">
                        {{value}}
                      </td>
                      <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #6b7280; vertical-align: top; word-break: break-word;">
                        {{#if counterparty}}{{counterparty}}{{/if}}
                      </td>
                    </tr>
                    {{/each}}
                    {{/each}}
                  </tbody>
                </table>
                {{#if originalTrade}}
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; margin-top: 8px;">
                  <thead>
                    <tr>
                      <th colspan="2" style="padding: 10px 8px; border: 1px solid #e5e7eb; font-size: 11px; font-weight: 600; color: #111827; background-color: #f9fafb; text-align: left;">
                        <span style="font-weight: 400; font-size: 12px; color: #111827;">
                          Original Trade: <strong>{{originalTrade.tradeId}}</strong>
                        </span>
                        {{#if originalTrade.productType}}
                        <span style="font-weight: 400; color: #6b7280; margin-left: 12px;">
                          {{originalTrade.productType}}
                        </span>
                        {{/if}}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {{#each originalTrade.rows}}
                    <tr>
                      <td style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: normal; color: #374151; background-color: #f9fafb; vertical-align: top; width: 30%;">
                        {{field}}
                      </td>
                      <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #111827; vertical-align: top; word-break: break-word;">
                        {{value}}
                      </td>
                    </tr>
                    {{/each}}
                  </tbody>
                </table>
                {{/if}}
              </div>
              {{/each}}
            `,
          }}
        />
      )}
    </EmailLayout>
  );
};

export default AffirmationMultipleSummary;
