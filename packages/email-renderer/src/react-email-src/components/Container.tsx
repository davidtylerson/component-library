import React from 'react';

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
  paddingTop = 24,
}) => {
  return (
    <div
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
    </div>
  );
};

export default Container;
