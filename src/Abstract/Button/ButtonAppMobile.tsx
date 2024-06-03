import React from 'react';
import { cx, css } from '@emotion/css';


type ButtonAppMobileConatinerStylesProps = {
    backgroundColor?: string;
    color?: string;
    fontFamiliy?: string;
    width?: string;
    margin?: string;
    borderRadius?: string;
    boxShadow?: string;
    cursor?: string;
    custom?: string;
}



const buttonAppMobileConatinerStyles = (style: ButtonAppMobileConatinerStylesProps) => css`
    font-family: ${style.fontFamiliy || 'Poppins, sans-serif'};
    background-color: ${style.backgroundColor || '#0ab1e6'};
    color: ${style.color || '#fff'};
    width: ${style.width || '85%'};
    margin: ${style.margin || '2% auto'};
    border-radius: ${style.borderRadius || '15px'};
    box-shadow: ${style.boxShadow || '0 1px 6px 0 #20212447'};
    cursor: ${style.cursor || 'pointer'};
    ${style.custom || ''}
`

type ButtonAppMobileContentStylesProps = {
    fontSize?: string;
    padding?: string;
    margin?: string;
    fontFamily?: string;
    custom?: string;
}

const buttonAppMobileContentStyles = (
    style: ButtonAppMobileContentStylesProps
) => css`
    font-size: ${style.fontSize || '1.5em'};
    padding: ${style.padding || '0.9em'};
    margin: ${style.margin || '0'};
    font-family: ${style.fontFamily || 'Poppins, sans-serif'};
    ${style.custom || ''}
`

type ButtonAppMobileProps = {
    containerStyles?: ButtonAppMobileConatinerStylesProps;
    containerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    contentStyles?: ButtonAppMobileContentStylesProps;
    contentProps?: React.HTMLAttributes<HTMLHeadingElement>;
    title: string;
}

export function ButtonAppMobile({
    containerStyles = {},
    containerProps= {},
    contentProps = {},
    contentStyles = {},
    title
}: ButtonAppMobileProps) {
    const { className: containerClassName, ...restContainerProps } = containerProps;
    const { className: contentClassName, ...restContentProps } = contentProps;

  return (
        <>
            <button className={cx(buttonAppMobileConatinerStyles(containerStyles), containerClassName)} {...restContainerProps}>
                <h1 className={cx(buttonAppMobileContentStyles(contentStyles), contentClassName)} {...restContentProps}>{title}</h1>
            </button>
        </>
  );
}
