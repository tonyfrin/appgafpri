import { cx, css } from '@emotion/css';
import { MainFooter } from '../Footer/Footer';
import Logo from '../assets/img/logo-blanco.png';
import { SingleHeader } from '../Header/SingleHeader';

type LayoutContainerStyleProps = {
  display?: string;
  backgroundImage?: string;
  flexDirection?: string;
  minHeight?: string;
  custom?: string;
};

const layoutContainerStyle = (
  styles: LayoutContainerStyleProps
) => css`
  ${styles.backgroundImage ? `background-image: url(${styles.backgroundImage});` : ''}
  display: ${styles.display || 'flex'};
  flex-direction: ${styles.flexDirection || 'column'};
  min-height: ${styles.minHeight || '100vh'};
  ${styles.custom || ''}
`;


export type LayoutProps = {
  children: React.ReactNode;
  containerStyles?: LayoutContainerStyleProps;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Layout = ({ 
  children,
  containerStyles = {},
  containerProps = {},
}: LayoutProps) => {
  const { className: containerClassName, ...restContainerProps } = containerProps;
  return (
      <div className={cx(layoutContainerStyle(containerStyles), containerClassName)} {...restContainerProps}>
      <>
      <SingleHeader
            props={{
                image: Logo,
                styleSection: {
                    padding: '0'
                },
            }}
        />
        <main style={{ flexGrow: 1 }}>{children}</main>
        <MainFooter 
            siteName="Gafpri Store"
            isLogin={false}
            styles={{
                position: 'relative',
            }}
        />
        </> 
      </div>
  );
};
