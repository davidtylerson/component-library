import React from 'react';

export interface EmailLayoutProps {
  children: React.ReactNode;
  preheader?: string;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({ 
  children, 
  preheader 
}) => (
  <>
    {preheader && (
      <div style={{
        color: 'transparent',
        display: 'none',
        height: '0',
        maxHeight: '0',
        maxWidth: '0',
        opacity: '0',
        overflow: 'hidden',
        visibility: 'hidden',
        width: '0',
      }}>
        {preheader}
      </div>
    )}
    <div style={{
      backgroundColor: '#F4F4F5',
      fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
      fontSize: '16px',
      lineHeight: '1.3',
      margin: '0',
      padding: '0',
    }}>
      {children}
    </div>
  </>
);

export interface EmailContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const EmailContainer: React.FC<EmailContainerProps> = ({
  children,
  style
}) => (
  <div style={{
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid #eaebed',
    borderRadius: '16px',
    ...style
  }}>
    {children}
  </div>
);

export interface EmailHeaderProps {
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: string;
  logoHeight?: string;
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({
  logoUrl = "http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/e4e1b526-0ef3-4511-a7a8-bc94353e9b3b/201x67.png",
  logoAlt = "Float",
  logoWidth = "100px",
  logoHeight = "auto"
}) => {
  return (
    <div style={{
      width: '100px',
      textAlign: 'center',
      marginBottom: '24px',
    }}>
      <a href="https://float.tech" style={{ 
        color: '#4A49A6', 
        fontWeight: 'bold', 
        textDecoration: 'none'
      }}>
        <img
          src={logoUrl}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
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
  );
};

export interface EmailFooterProps {
  children?: React.ReactNode;
}

export const EmailFooter: React.FC<EmailFooterProps> = ({ children }) => (
  <div style={{
    clear: 'both',
    paddingTop: '24px',
    textAlign: 'center',
    width: '100%',
  }}>
    {children || (
      <>
        <p style={{
          color: '#9a9ea6',
          fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: 'normal',
          margin: '0',
          marginBottom: '16px',
          paddingBottom: '0px',
          textAlign: 'center',
        }}>
          Float helps financial institutions interact seamlessly through shared digital workflows and standardized APIs across the transaction lifecycle.{' '}
          <a href="https://float.tech" style={{
            color: '#4A49A6',
            fontSize: '14px',
            fontWeight: 'bold',
            paddingBottom: '0px',
            textAlign: 'center',
            textDecoration: 'underline',
          }}>
            Learn more
          </a>.
        </p>
        <a href="https://float.tech" style={{
          color: '#4A49A6',
          fontSize: '14px',
          fontWeight: 'bold',
          paddingBottom: '0px',
          textAlign: 'center',
          textDecoration: 'underline',
        }}>
          <img src="http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/6a3db2b3-d35b-423f-8aac-830de81fb114/32x32.png" 
               alt="Float Logo" 
               width="32" 
               height="32" 
               style={{
                 display: 'inline-block',
                 marginBottom: '16px',
               }} />
        </a>
        <div style={{
          color: '#9a9ea6',
          fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          paddingBottom: '0px',
        }}>
          <div>Float Technologies Inc.</div>
          <div>SoHo, New York</div>
        </div>
      </>
    )}
  </div>
); 