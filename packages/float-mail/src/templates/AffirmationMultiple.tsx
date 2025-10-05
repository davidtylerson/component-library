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
  trade_date: string;
  trades: Trade[];
}

export const AffirmationMultiple: React.FC<AffirmationMultipleProps> = ({
  organization_name = '{{organization_name}}',
  trade_date = '{{trade_date}}',
  trades = [],
}) => {
  return (
    <EmailLayout preheader="Multiple trade affirmations required">
      <PageTitle>Trade Affirmations Required</PageTitle>

      <BodyText>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> is
        requesting your affirmation of the following {trades.length} trade
        {trades.length !== 1 ? 's' : ''} executed on{' '}
        <span style={{ fontWeight: 'bold' }}>{trade_date}</span>. Please review
        the detailed trade information provided below.
      </BodyText>

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

      {/* Render each trade as a separate table */}
      {trades.length > 0 ? (
        trades.map((trade, tradeIndex) => (
          <div key={tradeIndex} style={{ marginBottom: '32px' }}>
            {/* Single Table with Trade Header as First Row */}
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#ffffff',
              }}
            >
              {/* Trade Header Row */}
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
                {/* Column Headers */}
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
                    {/* Group Header Row */}
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

                    {/* Group Data Rows */}
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
        /* Placeholder table structure when no trades data */
        <div style={{ marginBottom: '32px' }}>
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
                    Trade ID: <strong>{'{{tradeId}}'}</strong>
                  </span>
                  <span
                    style={{
                      fontWeight: '400',
                      color: '#6b7280',
                      marginLeft: '12px',
                    }}
                  >
                    {'{{productType}}'}
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
                  {'{{groupName}}'}
                </td>
              </tr>
              <tr>
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
                  {'{{field}}'}
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
                  {'{{value}}'}
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
                  {'{{counterparty}}'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </EmailLayout>
  );
};

export default AffirmationMultiple;
