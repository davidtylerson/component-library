import React from 'react';
import { Container, Text, Link } from '@react-email/components';

interface FooterProps {
  companyDescription?: string;
  learnMoreUrl?: string;
  logoUrl?: string;
  companyName?: string;
  companyAddress?: string;
}

export const Footer: React.FC<FooterProps> = ({
  companyDescription = 'Float helps financial institutions interact seamlessly through shared digital workflows and standardized APIs across the transaction lifecycle.',
  learnMoreUrl = 'https://float.tech',
  logoUrl = 'http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/6a3db2b3-d35b-423f-8aac-830de81fb114/32x32.png',
  companyName = 'Float Technologies Inc.',
  companyAddress = 'SoHo, New York',
}) => {
  return (
    <Container
      style={{
        width: '100%',
        textAlign: 'center',
        marginTop: '32px',
        padding: '24px 16px',
        maxWidth: '600px',
      }}
    >
      {/* Company Description */}
      <Text
        style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#6b7280',
          margin: '0 0 16px 0',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        {companyDescription}{' '}
        <Link
          href={learnMoreUrl}
          style={{
            color: '#4A49A6',
            textDecoration: 'underline',
          }}
        >
          Learn more.
        </Link>
      </Text>

      {/* Footer Logo */}
      <div style={{ marginBottom: '16px' }}>
        <Link
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
            src={logoUrl}
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
        </Link>
      </div>

      {/* Company Info */}
      <Text
        style={{
          fontSize: '12px',
          lineHeight: '1.4',
          color: '#9ca3af',
          margin: '0',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        {companyName} {companyAddress}
      </Text>
    </Container>
  );
};

export default Footer;
