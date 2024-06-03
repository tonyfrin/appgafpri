import React from 'react';
import { css, cx } from '@emotion/css';

export type InputAppContainerStylesProps = {
    display?: string;
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
    margin?: string;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    textAlign?: 'center' | 'left' | 'right';    
    customStyles?: string;
}

const inputAppContainerStyles = (styles: InputAppContainerStylesProps) => css`
    display: ${styles.display || 'flex'};
    justify-content: ${styles.justifyContent || 'center'};
    align-items: ${styles.alignItems || 'center'};
    margin: ${styles.margin || '1em auto 0 auto'};
    flex-direction: ${styles.flexDirection || 'column'};
    text-align: ${styles.textAlign || 'center'};
    ${styles.customStyles || ''}
`

const inputAppTitleStyles = css`
    font-size: 0.6rem;
    font-weight: 500;
    color: #a0a0a0;
    font-family: 'Poppins', sans-serif;
    margin: 2px 0px;
    text-align: center;
`

type WhatsAppProps = {
    containerStyles?: InputAppContainerStylesProps;
}



export const WhatsApp = ({
    containerStyles = {},
}: WhatsAppProps) => {
    return (
        <>
            <div className={cx(inputAppContainerStyles(containerStyles))}>
                <p style={{width: '75%'}}className={inputAppTitleStyles}>{`Si tienes alguna pregunta o inconveniente, no dudes en escribirnos por WhatsApp al `} 
                <a 
                    style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#25D366',
                        fontFamily: "'Poppins', sans-serif",
                        textDecoration: 'none',
                    }}
                    target='_blank'
                    href='https://wa.me/18323522096?text=Hola%21%20necesito%20ayuda%20con%20la%20App%20Gafpri'
                >+1 (832) 352-2096.</a></p>
            </div>
        </>
    );
};
