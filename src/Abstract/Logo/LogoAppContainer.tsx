import React, { forwardRef } from 'react';
import { cx, css } from '@emotion/css';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

type SectionStyle = {
  display?: string;
  margin?: string;
  padding?: string;
};

type ContainerStyle = {
  width?: string;
  margin?: string;
  textAlign?: string;
};

type Media = {
  marginTop?: string;
  maxWidth?: string;
};

type ImageStyle = {
  marginTop?: string;
  marginBottom?: string;
  maxWidth?: string;
  media600Style?: Media;
  media300Style?: Media;
};

type Style = {
  sectionClass?: string;
  divClass?: string;
  imgClass?: string;
  image: StaticImageData; // Cambiado para usar StaticImageData de next/image
  styleSection?: SectionStyle;
  styleContainer?: ContainerStyle;
  styleImage?: ImageStyle;
};

// Cambiado de ImgHTMLAttributes<HTMLImageElement> & Style a solo Style
export type LogoProps = Style;

const sectionStyles = (styles: SectionStyle) => css`
  display: ${styles.display || 'flex'};
  margin: ${styles.margin || '0'};
  padding: ${styles.padding || '2px 4px 0px 4px'};
`;

const containerStyles = (styles: ContainerStyle) => css`
  width: ${styles.width || '100%'};
  margin: ${styles.margin || '0 auto'};
  text-align: ${styles.textAlign || 'center'};
`;

const imgStyle = (styles: ImageStyle) => css`
  height: auto;
  margin-top: ${styles.marginTop || '0'};
  margin-bottom: ${styles.marginBottom || '0'};
  max-width: ${styles.maxWidth || '80px'};
`;

export const LogoAppContainer = forwardRef(
  function LogoContainer(
    {
      image,
      sectionClass = '',
      divClass = '',
      imgClass = '',
      styleSection = {},
      styleContainer = {},
      styleImage = {},
      ...imgProps
    }: LogoProps,
    ref: React.ForwardedRef<HTMLImageElement>
  ): JSX.Element {
    return (
      <section className={cx(sectionStyles(styleSection), sectionClass)}>
        <div className={cx(containerStyles(styleContainer), divClass)}>
          <Image
            src={image.src}
            alt={'Logo'}
            width={150}
            height={150}
            {...imgProps}
            className={cx(imgStyle(styleImage), imgClass)}
            ref={ref}
            role="logo"
          />
        </div>
      </section>
    );
  }
);


LogoAppContainer.displayName = 'LogoAppContainer';

