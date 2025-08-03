import React from 'react';
import { Container, Section as EmailSection } from '@react-email/components';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface RowProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

interface ColumnProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'stretch';
  width?: string;
  className?: string;
}

// Card component for content containers
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
}) => {
  const variants = {
    default: {
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    elevated: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      boxShadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    outlined: {
      backgroundColor: '#ffffff',
      border: '2px solid #4A49A6',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
  };

  const paddings = {
    sm: '16px',
    md: '20px',
    lg: '24px',
  };

  return (
    <div
      style={{
        ...variants[variant],
        padding: paddings[padding],
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '16px',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// Row component for horizontal layouts
export const Row: React.FC<RowProps> = ({
  children,
  align = 'start',
  justify = 'start',
  gap = 'md',
  className = '',
}) => {
  const gaps = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: align,
        justifyContent: justify,
        gap: gaps[gap],
        width: '100%',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// Column component for vertical layouts
export const Column: React.FC<ColumnProps> = ({
  children,
  align = 'start',
  width = 'auto',
  className = '',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align,
        width: width,
        flex: width === 'auto' ? 'none' : '1',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// Content wrapper for max-width containers
export const ContentWrapper: React.FC<{
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}> = ({ children, maxWidth = '600px', className = '' }) => {
  return (
    <div
      style={{
        maxWidth: maxWidth,
        margin: '0 auto',
        width: '100%',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// Section wrapper for consistent spacing
export const SectionWrapper: React.FC<{
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, spacing = 'md', className = '' }) => {
  const spacings = {
    sm: '16px',
    md: '24px',
    lg: '32px',
  };

  return (
    <div
      style={{
        marginBottom: spacings[spacing],
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// Two column layout component
export const TwoColumnLayout: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: string;
  rightWidth?: string;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({
  left,
  right,
  leftWidth = '60%',
  rightWidth = '40%',
  gap = 'md',
  className = '',
}) => {
  const gaps = {
    sm: '16px',
    md: '24px',
    lg: '32px',
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: gaps[gap],
        width: '100%',
      }}
      className={className}
    >
      <div style={{ width: leftWidth }}>{left}</div>
      <div style={{ width: rightWidth }}>{right}</div>
    </div>
  );
};

// Centered layout component
export const CenteredLayout: React.FC<{
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}> = ({ children, maxWidth = '600px', className = '' }) => {
  return (
    <div
      style={{
        maxWidth: maxWidth,
        margin: '0 auto',
        textAlign: 'center',
        width: '100%',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// Export all components
export default {
  Card,
  Row,
  Column,
  ContentWrapper,
  SectionWrapper,
  TwoColumnLayout,
  CenteredLayout,
};
