import React from "react";
import { css } from '@emotion/css';
import { IconType } from "react-icons";
import { FaWallet } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa';
import { FaMotorcycle } from 'react-icons/fa';
import { FaMoneyBillAlt } from 'react-icons/fa';

type Items = {
    title: string;
    description: string;
    icon: IconType;
}

const boxesInfoContainer = css`
    display: flex;
    grid-column-gap: 32px;
    grid-row-gap: 32px;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 2rem;

    @media (max-width: 790px) {
        display: block;
    }
`;

const boxesInfoItemContainer = css`
    width: 25%;
    min-height: 60px;
    border-bottom: 12px solid #07b2e7;
    background-color: var(--white);
    border-radius: 12px 12px 0 0;
    padding: 2rem;
    box-shadow: 0 2px 20px -4px rgba(97, 103, 122, .2);
    grid-area: span 1 / span 1 / span 1 / span 1;
    opacity: 1;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    transform-style: preserve-3d;

    @media (max-width: 790px) {
        width: 90%;
        margin: 10px auto;
    }

    @media (max-width: 600px) {
        padding: 1rem;
    }
`

const boxesInfoItemIcon = css`
    background-color: #07b2e7;
    border-radius: 12px;
    width: 60px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    display: block;
    text-align: center;
`

const boxesInfoItemTitle = css`
    box-sizing: border-box;
    font-family: Poppins, sans-serif;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: .5rem;
    font-size: 1.3rem;
    font-weight: 700;
`

const boxesInfoItemDescription = css`
    color: #1f1f1f;
    margin-bottom: 0;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    text-align: center;
`

export const BoxesInfo = () => {

    const items: Items[] = [
        {
            title: 'Tienda Online',
            description: 'La más amplia variedad de repuestos de refrigeración.',
            icon: FaStore
        },
        {
            title: 'Billetera Digital',
            description: 'Recibe pagos de tus clientes y retira tu dinero de forma segura.',
            icon: FaWallet
        },
        {
            title: 'Delivery Gratis',
            description: 'Envío gratuito donde quiera que estés.',
            icon: FaMotorcycle
        },
        {
            title: 'Creditos sin Intereses',
            description: 'Acceso a creditos sin intereses en cualquiera de nuestras tiendas asociadas.',
            icon: FaMoneyBillAlt
        }
    ]

    return (
        
                <div className={boxesInfoContainer}>
                    {items.length > 0 && items.map((item, index) => (
                        <div key={`box-${index}`} className={boxesInfoItemContainer}>
                            {item.icon && <div className={boxesInfoItemIcon}><item.icon size={32} color="#fff"/></div>}
                            <div className={boxesInfoItemTitle}>{item.title}</div>
                            <p className={boxesInfoItemDescription}>{item.description}</p>
                        </div>
                        
                    ))}    
                </div>
    );
}