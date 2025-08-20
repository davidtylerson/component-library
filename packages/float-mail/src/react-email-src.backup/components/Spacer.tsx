import React from 'react';

interface SpacerProps {
  height: number;
  style?: React.CSSProperties;
}

export const Spacer: React.FC<SpacerProps> = ({ height, style = {} }) => {
  return (
    <div
      style={{
        height: `${height}px`,
        fontSize: `${height}px`,
        lineHeight: `${height}px`,
        ...style,
      }}
    >
      &nbsp;
    </div>
  );
};

export default Spacer;
