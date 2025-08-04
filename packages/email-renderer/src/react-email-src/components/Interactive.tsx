import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

interface LinkProps {
  children: React.ReactNode;
  href: string;
  variant?: 'default' | 'muted';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}) => {
  const baseStyles = {
    display: 'inline-block',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    textAlign: 'center' as const,
    border: 'none',
    cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto',
    boxSizing: 'border-box' as const,
  };

  const sizeStyles = {
    sm: { fontSize: '14px', padding: '8px 16px' },
    md: { fontSize: '16px', padding: '12px 24px' },
    lg: { fontSize: '18px', padding: '16px 32px' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#4A49A6',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: '#ffffff',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#4A49A6',
      border: '2px solid #4A49A6',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#4A49A6',
    },
  };

  const buttonStyle = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <a href={href} style={buttonStyle} className={className}>
      {children}
    </a>
  );
};

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  variant = 'default',
  className = '',
}) => {
  const styles = {
    default: {
      color: '#4A49A6',
      textDecoration: 'underline',
    },
    muted: {
      color: '#6b7280',
      textDecoration: 'underline',
    },
  };

  return (
    <a href={href} style={styles[variant]} className={className}>
      {children}
    </a>
  );
};

// Convenience components
export const ActionButton: React.FC<{
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  className?: string;
}> = ({
  children,
  href,
  variant = 'primary',
  fullWidth = false,
  className = '',
}) => (
  <Button
    href={href}
    variant={variant}
    size="lg"
    fullWidth={fullWidth}
    className={className}
  >
    {children}
  </Button>
);

export const TextLink: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
}> = ({ children, href, className = '' }) => (
  <Link href={href} variant="default" className={className}>
    {children}
  </Link>
);

export const MutedLink: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
}> = ({ children, href, className = '' }) => (
  <Link href={href} variant="muted" className={className}>
    {children}
  </Link>
);
