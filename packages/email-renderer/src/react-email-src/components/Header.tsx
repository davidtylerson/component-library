import React from 'react';

interface HeaderProps {
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logoUrl = 'http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/e4e1b526-0ef3-4511-a7a8-bc94353e9b3b/201x67.png',
  logoAlt = 'Float',
  logoWidth = '100px',
  logoHeight = 'auto',
}) => {
  return (
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

export default Header;
