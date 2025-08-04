import React from 'react';
// Removed unused Text import

interface CalloutProps {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
}

export const Callout: React.FC<CalloutProps> = ({
  children,
  variant = 'default'
}) => {
  const styles = {
    default: {
      backgroundColor: '#f3f4f6',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      width: '100%',
      boxSizing: 'border-box' as const,
    },
    warning: {
      backgroundColor: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      width: '100%',
      boxSizing: 'border-box' as const,
    },
    success: {
      backgroundColor: '#d1fae5',
      border: '1px solid #10b981',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      width: '100%',
      boxSizing: 'border-box' as const,
    }
  };

  return (
    <div style={styles[variant]}>
      {children}
    </div>
  );
};

export default Callout; 