import React from 'react';

export interface EmailButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  style,
  fullWidth = false,
  ...props
}) => {
  // Convert design system colors to inline styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#4A49A6',
          color: '#ffffff',
          border: '1px solid #4A49A6',
        };
      case 'secondary':
        return {
          backgroundColor: '#f8f9fa',
          color: '#4A49A6',
          border: '1px solid #dee2e6',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#4A49A6',
          border: '1px solid transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#4A49A6',
          border: '1px solid #4A49A6',
        };
      case 'destructive':
        return {
          backgroundColor: '#dc3545',
          color: '#ffffff',
          border: '1px solid #dc3545',
        };
      default:
        return {
          backgroundColor: '#4A49A6',
          color: '#ffffff',
          border: '1px solid #4A49A6',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '6px 12px',
          fontSize: '12px',
          borderRadius: '4px',
        };
      case 'lg':
        return {
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '6px',
        };
      default:
        return {
          padding: '8px 16px',
          fontSize: '14px',
          borderRadius: '4px',
        };
    }
  };

  const baseStyles = {
    display: 'inline-block',
    textDecoration: 'none',
    textAlign: 'center' as const,
    fontWeight: '500',
    cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  if (href) {
    return (
      <a href={href} style={baseStyles} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button style={baseStyles} {...props}>
      {children}
    </button>
  );
}; 