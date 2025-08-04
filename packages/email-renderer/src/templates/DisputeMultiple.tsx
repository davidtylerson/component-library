import React from 'react';

interface DisputedDocument {
  trade_id: string;
  counterparty_ref: string;
  comment: string;
}

interface DisputeMultipleProps {
  organization_name: string;
  disputedDocuments: DisputedDocument[];
}

export const DisputeMultiple: React.FC<DisputeMultipleProps> = ({
  organization_name = '{{organization_name}}',
  disputedDocuments = [
    {
      trade_id: '{{trade_id_1}}',
      counterparty_ref: '{{counterparty_ref_1}}',
      comment: '{{comment_1}}',
    },
    {
      trade_id: '{{trade_id_2}}',
      counterparty_ref: '{{counterparty_ref_2}}',
      comment: '{{comment_2}}',
    },
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
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: '1.2',
            margin: '0 0 20px 0',
            color: '#111827',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{organization_name}</span> has
          raised a dispute with the following trade confirmations
        </h2>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 16px 0',
            color: '#374151',
          }}
        >
          Please see comments regarding the attached confirmations.
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '16px',
            fontSize: '12px',
            minWidth: '100%',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th
                style={{
                  padding: '8px 0',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  width: '15%',
                  wordWrap: 'break-word',
                }}
              >
                Trade ID
              </th>
              <th
                style={{
                  padding: '8px 0',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  width: '25%',
                  wordWrap: 'break-word',
                }}
              >
                Counterparty Ref
              </th>
              <th
                style={{
                  padding: '8px 0',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  width: '60%',
                  wordWrap: 'break-word',
                }}
              >
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {disputedDocuments.map((doc, index) => (
              <tr key={index}>
                <td
                  style={{
                    borderBottom: '1px solid #dee2e6',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '12px',
                    lineHeight: '1.2',
                    overflow: 'hidden',
                    padding: '8px 0',
                    textOverflow: 'ellipsis',
                  }}
                  valign="top"
                >
                  {doc.trade_id}
                </td>
                <td
                  style={{
                    borderBottom: '1px solid #dee2e6',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '12px',
                    lineHeight: '1.2',
                    overflow: 'hidden',
                    padding: '8px 0',
                    textOverflow: 'ellipsis',
                  }}
                  valign="top"
                >
                  {doc.counterparty_ref}
                </td>
                <td
                  style={{
                    borderBottom: '1px solid #dee2e6',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '12px',
                    lineHeight: '1.2',
                    padding: '8px 0',
                  }}
                  valign="top"
                >
                  {doc.comment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default DisputeMultiple;
