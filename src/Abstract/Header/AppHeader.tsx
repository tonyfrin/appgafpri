import React from 'react';
import { cx, css } from '@emotion/css';
import { LogoAppContainer, LogoProps } from '../Logo/LogoAppContainer';

type style = {
  headerClass?: string;
};

type LoginHeaderProps = LogoProps & style;

type HeaderStyle = {
  background?: string;
  width?: string;
  custom?: string;
};

const headerStyles = (styles: HeaderStyle): string => css`
  background: ${styles.background ||
  'linear-gradient(to left, #324375, #07b2e7)'};
  width: ${styles.width || '100%'};
  ${styles.custom || ''}
`;

const headerContentStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    margin: auto;
`;

export type AppHeaderProps = {
  props: LoginHeaderProps;
  styles?: HeaderStyle;
};

export const AppHeader = ({
  props,
  styles = {},
}: AppHeaderProps): JSX.Element => {
  const { image, headerClass = '', ...imgProps }: LoginHeaderProps = props;

  return (
    <header className={cx(headerStyles(styles))}>
      <div className={cx(headerContentStyle)}>
        <LogoAppContainer image={image} {...imgProps}
      
        />
      </div>
    </header>
  );
};
