import React from "react";
import { cx, css } from '@emotion/css';

type Title1StoreContentStyleProps = {
    textTransform?: string;
    fontZize?: string;
    margin?: string;
    color?: string;
    custom?: string;
}

const title1StoreContentStyle = (
    styles: Title1StoreContentStyleProps
) => css`
    font-size: ${styles.fontZize || '24px'};
    text-transform: ${styles.textTransform || 'uppercase'};
    margin: ${styles.margin || '0'};
    ${styles.color ? `color: ${styles.color};` : ''}
    ${styles.custom || ''}
`;

export type Title1StoreProps = {
    contentStyles?: Title1StoreContentStyleProps;
    contentProps?: React.HTMLAttributes<HTMLHeadingElement>;
    children?: JSX.Element;
};

export const Title1Store = (
    {
        contentStyles = {},
        contentProps = {},
        children,
    }: Title1StoreProps
): JSX.Element => {
    const { className: contentClassName, ...restContentProps } = contentProps;

    return (
   
            <h1
                className={cx(title1StoreContentStyle(contentStyles), contentClassName)}
                {...restContentProps}
            >
                {children}
            </h1>
    );
};