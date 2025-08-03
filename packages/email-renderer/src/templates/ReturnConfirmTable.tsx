import React from 'react';

interface ReturnConfirmTableProps {
  organization_name: string;
  table_fields: Array<{ label: string; value: string }>;
}

export const ReturnConfirmTable: React.FC<ReturnConfirmTableProps> = ({
  organization_name = '{{organization_name}}',
  table_fields = [
    { label: 'Trade ID', value: '{{trade_id}}' },
    { label: 'Counterparty', value: '{{counterparty}}' },
    { label: 'Trade Date', value: '{{trade_date}}' },
    { label: 'Amount', value: '{{amount}}' },
  ],
}) => {
  return (
    <div
      style={{
        fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
        backgroundColor: '#F4F4F5',
        margin: 0,
        padding: 0,
        width: '100%',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          width: '100px',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <a
          href="https://float.tech"
          style={{
            color: '#4A49A6',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          <img
            src="http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/e4e1b526-0ef3-4511-a7a8-bc94353e9b3b/201x67.png"
            alt="Float"
            width="100px"
            height="auto"
            style={{
              display: 'block',
              margin: '0 auto',
              border: '0',
              outline: 'none',
              textDecoration: 'none',
              height: 'auto',
              maxWidth: '200px',
              width: '100%',
            }}
          />
        </a>
      </div>

      {/* Main Content */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #eaebed',
          borderRadius: '16px',
          width: '100%',
          margin: '0 16px',
          maxWidth: 'calc(100% - 32px)',
          boxSizing: 'border-box',
          padding: '24px',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: '1.2',
            margin: '0 0 20px 0',
            color: '#111827',
          }}
        >
          You have received a signed trade confirmation from{' '}
          <span style={{ fontWeight: 'bold' }}>{organization_name}</span>
        </h1>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 16px 0',
            color: '#374151',
          }}
        >
          Please find your fully executed trade confirmation for the following
          trade attached to this email.
        </p>

        <div style={{ margin: '24px 0' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              margin: '0 0 12px 0',
              color: '#111827',
            }}
          >
            Trade Details
          </h3>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '16px',
              fontSize: '12px',
              minWidth: '100%',
            }}
          >
            <tbody>
              {table_fields.map((field, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #dee2e6',
                      fontWeight: 'bold',
                      width: '30%',
                      color: '#374151',
                    }}
                  >
                    {field.label}
                  </td>
                  <td
                    style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #dee2e6',
                      width: '70%',
                      color: '#374151',
                    }}
                  >
                    {field.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: '32px',
          padding: '24px 16px',
          maxWidth: '600px',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 16px 0',
            color: '#6b7280',
            textAlign: 'center',
            padding: '0 16px',
          }}
        >
          Float helps financial institutions interact seamlessly through shared
          digital workflows and standardized APIs across the transaction
          lifecycle.{' '}
          <a
            href="https://float.tech"
            style={{
              color: '#4A49A6',
              textDecoration: 'underline',
            }}
          >
            Learn more.
          </a>
        </p>

        <div style={{ marginBottom: '16px' }}>
          <a
            href="https://float.tech"
            style={{
              color: '#4A49A6',
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '0px',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src="http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/6a3db2b3-d35b-423f-8aac-830de81fb114/32x32.png"
              alt="Float Logo"
              width={32}
              height={32}
              style={{
                display: 'inline-block',
                marginBottom: '16px',
                border: '0',
                outline: 'none',
                textDecoration: 'none',
              }}
            />
          </a>
        </div>

        <p
          style={{
            fontSize: '12px',
            lineHeight: '1.4',
            margin: '0',
            color: '#9ca3af',
            textAlign: 'center',
            padding: '0 16px',
          }}
        >
          Float Technologies Inc. SoHo, New York
        </p>
      </div>
    </div>
  );
};

export default ReturnConfirmTable;
