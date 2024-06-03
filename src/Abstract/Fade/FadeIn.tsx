import React, { ReactNode } from 'react';

export type FadeInProps = {
  keyName: string;
  children: ReactNode;
  isVisible: boolean;
};

export const FadeIn: React.FC<FadeInProps> = ({
  keyName,
  children,
  isVisible,
}) => {
  const getOpacity = () => {
    if (isVisible) {
      return 1;
    }
    return 0;
  };

  return (
    <React.Fragment key={keyName}>
      <div
        className="fade-in"
        style={{
          opacity: getOpacity(),
          transition: 'opacity 0.5s',
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};