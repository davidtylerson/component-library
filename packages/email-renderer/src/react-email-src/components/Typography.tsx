import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

interface HeadingProps extends TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'default' | 'large' | 'small';
}

interface TextProps extends TypographyProps {
  variant?: 'body' | 'caption' | 'lead' | 'muted';
  align?: 'left' | 'center' | 'right';
}

// Heading component with consistent styling
export const EmailHeading: React.FC<HeadingProps> = ({
  children,
  as = 'h2',
  variant = 'default',
  className = '',
}) => {
  const styles = {
    default: {
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '1.3',
      margin: '0 0 16px 0',
      color: '#111827',
    },
    large: {
      fontSize: '24px',
      fontWeight: 'bold',
      lineHeight: '1.2',
      margin: '0 0 20px 0',
      color: '#111827',
    },
    small: {
      fontSize: '16px',
      fontWeight: 'bold',
      lineHeight: '1.3',
      margin: '0 0 12px 0',
      color: '#111827',
    },
  };

  const Component = as;
  return React.createElement(
    Component,
    { style: styles[variant], className },
    children
  );
};

// Text component with variants
export const EmailText: React.FC<TextProps> = ({
  children,
  variant = 'body',
  align = 'left',
  className = '',
}) => {
  const styles = {
    body: {
      fontSize: '14px',
      lineHeight: '1.5',
      margin: '0 0 12px 0',
      color: '#374151',
      textAlign: align,
    },
    caption: {
      fontSize: '12px',
      lineHeight: '1.4',
      margin: '0 0 8px 0',
      color: '#6b7280',
      textAlign: align,
    },
    lead: {
      fontSize: '16px',
      lineHeight: '1.6',
      margin: '0 0 16px 0',
      color: '#374151',
      textAlign: align,
    },
    muted: {
      fontSize: '14px',
      lineHeight: '1.5',
      margin: '0 0 12px 0',
      color: '#6b7280',
      textAlign: align,
    },
  };

  return (
    <p style={styles[variant]} className={className}>
      {children}
    </p>
  );
};

// Convenience components
export const PageTitle: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <EmailHeading as="h1" variant="large" className={className}>
    {children}
  </EmailHeading>
);

export const SectionTitle: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <EmailHeading as="h2" variant="default" className={className}>
    {children}
  </EmailHeading>
);

export const SubsectionTitle: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <EmailHeading as="h3" variant="small" className={className}>
    {children}
  </EmailHeading>
);

export const BodyText: React.FC<TextProps> = ({ children, ...props }) => (
  <EmailText variant="body" {...props}>
    {children}
  </EmailText>
);

export const CaptionText: React.FC<TextProps> = ({ children, ...props }) => (
  <EmailText variant="caption" {...props}>
    {children}
  </EmailText>
);

export const LeadText: React.FC<TextProps> = ({ children, ...props }) => (
  <EmailText variant="lead" {...props}>
    {children}
  </EmailText>
);

export const MutedText: React.FC<TextProps> = ({ children, ...props }) => (
  <EmailText variant="muted" {...props}>
    {children}
  </EmailText>
);
