import React from 'react';

interface SpacingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

// Spacer component for consistent spacing
export const Spacer: React.FC<SpacingProps> = ({
  size = 'md',
  direction = 'vertical',
  className = '',
}) => {
  const sizes = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  };

  const style =
    direction === 'vertical'
      ? { height: sizes[size] }
      : { width: sizes[size], display: 'inline-block' };

  return <div style={style} className={className} />;
};

// Divider component for visual separation
export const Divider: React.FC<{
  color?: string;
  thickness?: string;
  className?: string;
}> = ({ color = '#e5e7eb', thickness = '1px', className = '' }) => {
  return (
    <div
      style={{
        height: thickness,
        backgroundColor: color,
        margin: '16px 0',
        width: '100%',
      }}
      className={className}
    />
  );
};

// Container with consistent padding
export const PaddedContainer: React.FC<{
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ children, padding = 'md', className = '' }) => {
  const paddings = {
    sm: '12px',
    md: '24px',
    lg: '32px',
    xl: '48px',
  };

  return (
    <div style={{ padding: paddings[padding] }} className={className}>
      {children}
    </div>
  );
};

// Section with consistent spacing
export const Section: React.FC<{
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
    <div style={{ marginBottom: spacings[spacing] }} className={className}>
      {children}
    </div>
  );
};

// Quick spacing utilities
export const XS: React.FC<{ direction?: 'vertical' | 'horizontal' }> = ({
  direction,
}) => <Spacer size="xs" direction={direction} />;

export const SM: React.FC<{ direction?: 'vertical' | 'horizontal' }> = ({
  direction,
}) => <Spacer size="sm" direction={direction} />;

export const MD: React.FC<{ direction?: 'vertical' | 'horizontal' }> = ({
  direction,
}) => <Spacer size="md" direction={direction} />;

export const LG: React.FC<{ direction?: 'vertical' | 'horizontal' }> = ({
  direction,
}) => <Spacer size="lg" direction={direction} />;

export const XL: React.FC<{ direction?: 'vertical' | 'horizontal' }> = ({
  direction,
}) => <Spacer size="xl" direction={direction} />;

export const XXL: React.FC<{ direction?: 'vertical' | 'horizontal' }> = ({
  direction,
}) => <Spacer size="2xl" direction={direction} />;
