import React from 'react';
import { cx, css, keyframes } from '@emotion/css';

const mainStyle = (styles: MainStyle) => css`
  display: ${styles.display || 'flex'};
  justify-content: ${styles.justifyContent || 'center'};
  padding: ${styles.padding || '30%'};
  ${styles.custom || ''}
`;

type MainStyle = {
  display?: string;
  justifyContent?: string;
  padding?: string;
  custom?: string;
};

type DivStyle = {
  animation?: string | undefined;
  border?: string | undefined;
  borderTop?: string | undefined;
  borderRadius?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
};

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const divStyles = (styles: DivStyle) => css`
  animation: ${spin} ${styles.animation || '2s linear infinite'};
  border: ${styles.border || '6px solid #eee'};
  border-top: ${styles.borderTop || '6px solid #077bb4'};
  border-radius: ${styles.borderRadius || '50%'};
  width: ${styles.width || '80px'};
  height: ${styles.height || '80px'};
`;

export type LoadingProps = {
  mainStyles?: MainStyle | undefined;
  classMain?: string;
  classDiv?: string;
  divStyle?: DivStyle;
};

export const Loading = ({
  mainStyles = {},
  classMain = '',
  classDiv = '',
  divStyle = {},
}: LoadingProps) => {
  return (
    <>
      <main className={cx(mainStyle(mainStyles), classMain)}>
        <div className={cx(divStyles(divStyle), classDiv)} />
      </main>
    </>
  );
};
