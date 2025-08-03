import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface EmailLayoutProps {
  children: React.ReactNode;
  preheader?: string;
  backgroundColor?: string;
  maxWidth?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  children,
  preheader,
  backgroundColor = '#F4F4F5',
  maxWidth = '600px',
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
        backgroundColor,
        margin: 0,
        padding: 0,
        width: '100%',
        maxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {/* Preheader */}
      {preheader && (
        <div
          style={{
            display: 'none',
            fontSize: '1px',
            color: '#ffffff',
            lineHeight: '1px',
            maxHeight: '0px',
            maxWidth: '0px',
            opacity: '0',
            overflow: 'hidden',
          }}
        >
          {preheader}
        </div>
      )}

      {/* Header - Outside the white card */}
      {showHeader && <Header />}

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
        {/* Main Content */}
        {children}
      </div>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

export default EmailLayout;
