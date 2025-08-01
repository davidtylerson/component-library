import React from 'react';

export interface EmailTextProps {
  children: React.ReactNode;
  variant?: 'body' | 'heading' | 'caption' | 'lead' | 'muted';
  style?: React.CSSProperties;
}

export const EmailText: React.FC<EmailTextProps> = ({ 
  children, 
  variant = 'body', 
  style 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'heading':
        return {
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1A1A1E',
          margin: '0 0 16px 0',
          lineHeight: '1.2',
        };
      case 'lead':
        return {
          fontSize: '16px',
          color: '#1A1A1E',
          margin: '0 0 12px 0',
          lineHeight: '1.5',
        };
      case 'caption':
        return {
          fontSize: '12px',
          color: '#6B7280',
          margin: '0 0 8px 0',
          lineHeight: '1.4',
        };
      case 'muted':
        return {
          fontSize: '14px',
          color: '#6B7280',
          margin: '0 0 12px 0',
          lineHeight: '1.5',
        };
      default:
        return {
          fontSize: '14px',
          color: '#1A1A1E',
          margin: '0 0 12px 0',
          lineHeight: '1.5',
        };
    }
  };

  return (
    <div style={{ ...getVariantStyles(), ...style }}>
      {children}
    </div>
  );
};

export const EmailHeading: React.FC<EmailTextProps> = (props) => (
  <EmailText variant="heading" {...props} />
);

export const EmailCaption: React.FC<EmailTextProps> = (props) => (
  <EmailText variant="caption" {...props} />
);

export const EmailMuted: React.FC<EmailTextProps> = (props) => (
  <EmailText variant="muted" {...props} />
); 