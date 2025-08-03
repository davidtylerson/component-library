import React from 'react';

interface DisputeConfirmProps {
  organization_name: string;
  message: string;
  product_type: string;
  trade_id: string;
  counterparty_ref: string;
  trade_date: string;
  confirmation_date: string;
}

export const DisputeConfirm: React.FC<DisputeConfirmProps> = ({
  organization_name = '{{organization_name}}',
  message = '{{message}}',
  product_type = '{{product_type}}',
  trade_id = '{{trade_id}}',
  counterparty_ref = '{{counterparty_ref}}',
  trade_date = '{{trade_date}}',
  confirmation_date = '{{confirmation_date}}',
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
          Dispute Confirmed
        </h1>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 12px 0',
            color: '#374151',
          }}
        >
          Hello,
        </p>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 12px 0',
            color: '#374151',
          }}
        >
          A dispute has been confirmed for the following transaction:
        </p>

        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '16px',
            borderRadius: '8px',
            margin: '16px 0',
          }}
        >
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#374151' }}>
            <strong>Organization:</strong> {organization_name}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#374151' }}>
            <strong>Product Type:</strong> {product_type}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#374151' }}>
            <strong>Trade ID:</strong> {trade_id}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#374151' }}>
            <strong>Counterparty Ref:</strong> {counterparty_ref}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#374151' }}>
            <strong>Trade Date:</strong> {trade_date}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#374151' }}>
            <strong>Confirmation Date:</strong> {confirmation_date}
          </p>
        </div>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 12px 0',
            color: '#374151',
          }}
        >
          <strong>Dispute Message:</strong>
        </p>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 12px 0',
            color: '#374151',
          }}
        >
          {message}
        </p>

        <div style={{ margin: '24px 0' }}>
          <a
            href="https://float.tech/disputes"
            style={{
              backgroundColor: '#4A49A6',
              borderRadius: '8px',
              color: '#ffffff',
              display: 'inline-block',
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '1.2',
              padding: '16px 32px',
              textDecoration: 'none',
              textAlign: 'center',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            View Dispute Details
          </a>
        </div>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 12px 0',
            color: '#374151',
          }}
        >
          If you have any questions about this dispute, please contact our
          support team.
        </p>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 12px 0',
            color: '#374151',
          }}
        >
          Best regards,
          <br />
          The Float Team
        </p>
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

export default DisputeConfirm;
