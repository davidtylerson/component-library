import React from 'react';
import {
  EmailLayout,
  PageTitle,
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

interface Trade {
  tradeId: string;
  productType: string;
  groups: TradeGroup[];
}

interface AffirmationMultipleProps {
  organization_name: string;
  trades: Trade[];
}

export const AffirmationMultiple: React.FC<AffirmationMultipleProps> = ({
  organization_name = '{{organization_name}}',
  trades = [],
}) => {
  const isPreviewMode = organization_name !== '{{organization_name}}';

  return (
    <EmailLayout preheader="Multiple trade affirmations required">
      <PageTitle>Trade Affirmations Required</PageTitle>

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
        1. To Affirm: Reply with{' '}
        <span style={{ fontWeight: 'bold' }}>AGREED</span> if all trade details
        are correct.
        <br />
        2. To Dispute: Reply with{' '}
        <span style={{ fontWeight: 'bold' }}>DISPUTED</span> and provide details
        of any discrepancies.
      </BodyText>

      <LG />

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
                      borderTop: '1px solid #e5e7eb',
                      borderLeft: '1px solid #e5e7eb',
                      borderRight: '1px solid #e5e7eb',
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
                      Trade ID: <strong>{trade.tradeId}</strong>
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
                      borderLeft: '1px solid #e5e7eb',
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
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
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
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
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
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
                          borderLeft: '1px solid #e5e7eb',
                          borderRight: '1px solid #e5e7eb',
                          borderBottom: '1px solid #e5e7eb',
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
                            borderLeft: '1px solid #e5e7eb',
                            borderRight: '1px solid #e5e7eb',
                            borderBottom: '1px solid #e5e7eb',
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
                            borderRight: '1px solid #e5e7eb',
                            borderBottom: '1px solid #e5e7eb',
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
                            borderRight: '1px solid #e5e7eb',
                            borderBottom: '1px solid #e5e7eb',
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
                          Trade ID: <strong>{{tradeId}}</strong>
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
              </div>
              {{/each}}
            `,
          }}
        />
      )}
    </EmailLayout>
  );
};

export default AffirmationMultiple;
