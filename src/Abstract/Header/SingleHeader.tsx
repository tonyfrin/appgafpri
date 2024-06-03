import React from 'react';
import { cx, css } from '@emotion/css';
import { LogoContainer, LogoProps } from '../Logo/LogoContainer';
import { SingleMenu } from '../Menu/SingleMenu';

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
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin: auto;
`;

export type SingleHeaderProps = {
  props: LoginHeaderProps;
  styles?: HeaderStyle;
};

export const SingleHeader = ({
  props,
  styles = {},
}: SingleHeaderProps): JSX.Element => {
  const { image, headerClass = '', ...imgProps }: LoginHeaderProps = props;

  const itemsMenu = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'About',
      link: '/about',
    },
    {
      title: 'Contact',
      link: '/contact',
    },
    {
      title: 'Services',
      link: '/services',
    },
  ]

  return (
    <header className={cx(headerStyles(styles))}>
      <div className={cx(headerContentStyle)}>
        <LogoContainer image={image} {...imgProps}
          styleImage={{
            maxWidth: '100px',
          }}
        />
        <SingleMenu 
          items={itemsMenu}
        />
      </div>
    </header>
  );
};
