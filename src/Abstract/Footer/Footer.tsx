import React from 'react';
import { cx, css } from '@emotion/css';

const footerStyles = (styles: FooterStyle): string => css`
  background-color: ${styles.backgroundColor || '#30679e'};
  color: ${styles.color || '#ffffff'};
  position: ${styles.position || 'fixed'};
  bottom: ${styles.bottom || 0};
  left: ${styles.left || 0};
  right: ${styles.right || 0};
  z-index: ${styles.right || 996};
`;

type FooterStyle = {
  backgroundColor?: string;
  color?: string;
  position?: 'fixed' | 'absolute' | 'relative' | 'static';
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  zIndex?: number;
};

const footerDivStyles = () => css`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const footerPStyles = () => css`
  font-weight: 300;
  font-size: 12px;
  margin: 0px;

  @media (max-width: 750px) {
    font-size: 10px;
  }

  @media (max-width: 750px) {
    font-size: 10px;
  }

  @media (max-width: 500px) {
    font-size: 6px;
  }
`;

const footerSeparatorStyles = () => css`
  padding: 0 0.5em;
  font-size: 12px;

  @media (max-width: 600px) {
    font-size: 10px;
  }

  @media (max-width: 500px) {
    font-size: 6px;
  }
`;

const footerOutStyles = () => css`
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  color: #fff;

  @media (max-width: 600px) {
    font-size: 10px;
  }

  @media (max-width: 500px) {
    font-size: 6px;
  }
`;

type Footer = {
  footerClass?: string;
  footerDivClass?: string;
  footerPClass?: string;
  styles?: FooterStyle | undefined;
  isLogin: boolean;
  year?: string | undefined;
  siteName: string;
  onLogOut?: () => void;
};

export const MainFooter = ({
  footerClass = '',
  footerDivClass = '',
  footerPClass = '',
  styles = {},
  isLogin,
  year = '2023',
  siteName,
  onLogOut,
}: Footer): JSX.Element => {
  return (
    <footer className={cx(footerStyles(styles), footerClass)}>
      <div className={cx(footerDivStyles(), footerDivClass)}>
        <p className={cx(footerPStyles(), footerPClass)}>
          {`© Copyright ${year} ${siteName} - Todos los derechos reservados`}
        </p>
        {isLogin ? (
          <>
            <span className={footerSeparatorStyles()}> / </span>
            <span onClick={onLogOut} className={footerOutStyles()}>
              Salir
            </span>
          </>
        ) : (
          ''
        )}
      </div>
    </footer>
  );
};
