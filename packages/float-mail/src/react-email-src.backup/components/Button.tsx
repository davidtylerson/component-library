import React from 'react';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  children,
  align = 'center',
  fullWidth = false,
  style = {},
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4A49A6',
    borderRadius: '8px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1.2',
    padding: '12px 24px',
    textDecoration: 'none',
    textAlign: 'center',
    width: fullWidth ? '100%' : 'auto',
    ...style,
  };

  return (
    <div
      style={{
        width: '100%',
        marginBottom: '16px',
        textAlign: align,
      }}
    >
      <a
        href={href}
        style={buttonStyle}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </div>
  );
};

export default Button;
