import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { handleKeyDown, handlePasteForAmount } from '../helpers';

export type InputAppContainerStylesProps = {
    display?: string;
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
    margin?: string;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    textAlign?: 'center' | 'left' | 'right';   
    borderBottom?: string; 
    width?: string;
    customStyles?: string;
}

const inputAppContainerStyles = (styles: InputAppContainerStylesProps) => css`
    display: ${styles.display || 'flex'};
    justify-content: ${styles.justifyContent || 'center'};
    align-items: ${styles.alignItems || 'center'};
    margin: ${styles.margin || '2em auto'};
    flex-direction: ${styles.flexDirection || 'column'};
    text-align: ${styles.textAlign || 'center'};
    ${styles.customStyles || ''}
`

const inputAppTitleStyles = css`
    font-size: 0.7rem;
    font-weight: 600;
    color: #a0a0a0;
    font-family: 'Poppins', sans-serif;
    margin: 2px 0px;
    text-align: center;
`

const inputAppStyles = css`
  width: min-content;
  margin: 0;
  border: none;
  border-button: 2px solid #eaeaea;
  padding: 0;
  text-align: left;
  outline: 0;
  border-radius: 15px;
  background-color: transparent;
  box-sizing: border-box;
  font-size: 2em;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-align: center;

  ::placeholder {
    color: #a0a0a0;
    font-size: 1em;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
`;

type InputAppContainerProps = {
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & { functionChange?: (value: string) => void; } 
    symbol?: string;
    description?: string;
    containerStyles?: InputAppContainerStylesProps;
    title?: string;
    amountMax?: number;
}

function formatCurrency(value: string) {
    // Eliminar cualquier carácter que no sea un número
    value = value.replace(/[^\d]/g, '');
  
    // Convertir a número entero y luego a string para manipular
    let intValue = parseInt(value, 10).toString();
  
    // Asegurarnos de que siempre haya al menos dos dígitos para centavos
    if (intValue.length < 3) {
      intValue = intValue.padStart(3, '0');
    }
  
    // Insertar el punto decimal
    const integerPart = intValue.slice(0, -2);
    const decimalPart = intValue.slice(-2);
  
    // Formatear parte entera con comas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return `${formattedInteger}.${decimalPart}`;
  }

  



export const InputAppAmount = ({
    inputProps,
    symbol,
    description,
    containerStyles = {},
    title,
    amountMax = 10000,
}: InputAppContainerProps) => {
    const spanRef = React.useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState('50px');
    const { onChange: inputChange, ...restInputProps } =
    inputProps;
    const [value, setValue] = useState<string>('');

    

    function cleanCurrencyValue(newValue: string): string {
        return newValue.replace(/,/g, '');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const formattedValue = formatCurrency(inputValue);
        const cleanedValue = cleanCurrencyValue(formattedValue);
        const numericValue = parseFloat(cleanedValue);

        if (numericValue <= amountMax) {
            setValue(formattedValue);
            inputProps.functionChange?.(cleanCurrencyValue(formattedValue));
        } else {
            const formattedValue = formatCurrency((amountMax * 100).toString());
            setValue(formattedValue);
            inputProps.functionChange?.(cleanCurrencyValue(formattedValue));
        }
    };

    React.useEffect(() => {
        if (spanRef.current) {
            const spanWidth = spanRef.current.offsetWidth + 30;
            setInputWidth(`${spanWidth}px`);
        }
    }, [value]);

    return (
        <>
            <div className={cx(inputAppContainerStyles(containerStyles))}>
                {title && 
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '85%',
                    }}  
                ><p className={inputAppTitleStyles}>{title}</p></div>}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        border: '2px solid #eaeaea',
                        padding: '0.5em 0.5em 0.5em 1.3em',
                        backgroundColor: '#fff',
                        borderRadius: '15px',
                    }}
                >
                    {symbol &&
                        <span style={{
                            fontSize: '2em',
                            fontFamily: 'Poppins', 
                            fontWeight: 600,   
                        }}>{symbol}</span>
                    }
                    <input 
                        className={inputAppStyles}  
                        style={{ width: inputWidth }} 
                        onKeyUp= {(e) => handleKeyDown(e, value)}
                        // onPaste= {handlePasteForAmount}
                        onChange={handleChange}
                        value={value}
                        {...restInputProps}
                    />
                </div>
                <span
                    ref={spanRef}
                    style={{
                        position: 'absolute',
                        visibility: 'hidden',
                        whiteSpace: 'nowrap',
                        fontSize: '2em',
                        fontFamily: 'inherit',
                    }}
                >{value || '0.00'}</span>
                
                {description && <p style={{width: '75%'}}className={inputAppTitleStyles}>{description}</p>}
            </div>
        </>
    );
};
