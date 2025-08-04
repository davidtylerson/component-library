import React from 'react';
import { Container as EmailContainer } from '@react-email/components';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: number;
  padding?: number;
  paddingTop?: number;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 600,
  padding = 0,
  paddingTop = 24
}) => {
  return (
    <EmailContainer
      style={{
        margin: '0 auto !important',
        maxWidth: `${maxWidth}px`,
        padding: `${padding}px`,
        paddingTop: `${paddingTop}px`,
        width: `${maxWidth}px`,
        boxSizing: 'border-box',
        display: 'block',
      }}
    >
      {children}
    </EmailContainer>
  );
};

export default Container; 