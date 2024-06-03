import React from 'react';
import { cx, css } from '@emotion/css'
import { Title1Store, Title1StoreProps } from '../Title/Title1Store';

type BannerStoreContainerStyleProps = {
    backgroundImage?: string;
    margin?: string;
    backgroundRepeat?: string;
    height?: string;
    width?: string;
    textAlign?: string;
    alignItems?: string;
    display?: string;
    justifyContent?: string;
    backgroundImageSize?: string;
    custom?: string;
}

const BannerStoreContainerStyle = (
    styles: BannerStoreContainerStyleProps
) => css`
    ${styles.backgroundImage ? `background-image: url(${styles.backgroundImage});` : ''}
    background-repeat: ${styles.backgroundRepeat || 'no-repeat'};
    height: ${styles.height || '150px'};
    width: ${styles.width || '70%'};
    margin: ${styles.margin || '20px auto 0px auto'};
    text-align: ${styles.textAlign || 'center'};
    align-items: ${styles.alignItems || 'center'};
    display: ${styles.display || 'flex'};
    justify-content: ${styles.justifyContent || 'center'};
    background-size: ${styles.backgroundImageSize || 'cover'};
    // background-size: 120vh;
    ${styles.custom || ''}
`;

type BannerStoreProps = {
    children: React.ReactNode;
    containerStyles?: BannerStoreContainerStyleProps;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    titleProps?: Title1StoreProps;
}

export const BannerStore = (
    {
        children,
        containerStyles = {},
        containerProps = {},
        titleProps = {}
    }: BannerStoreProps
): JSX.Element => {
    const { className, ...restContainerProps } = containerProps;
    return (
        <div className={cx(BannerStoreContainerStyle(containerStyles), className)} {...restContainerProps}>
                <Title1Store {...titleProps}><>{children}</></Title1Store>
        </div>
    )
}
