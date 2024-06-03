import React from "react";
import { css } from '@emotion/css';
import Image from "next/image";
import WalletBanner from '../assets/img/fondo-wallet.jpg';

const serviceSectionContainer = css`
    width: 100%;
    margin-top: 10rem;
    margin-bottom: 2rem;
`;

const serviceSectionContent = css`
    grid-auto-columns: 1fr;
    display: grid;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    grid-template-rows: auto;
    grid-template-columns: 1.5fr 1.5fr;
    justify-items: stretch;
    margin-top: 1rem;

    @media (max-width: 700px) {
        display: block;
    }
`

const containerText = css`
    grid-area: span 1 / span 1 / span 1 / span 1;
    align-self: center;
    justify-self: start;
    padding: 1rem 4rem;
    box-sizing: border-box;

    @media (max-width: 790px) {
        padding: 0rem 1rem;
    }
`

const titleStyle = css`
    opacity: 1;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    transform-style: preserve-3d;
    text-align: left;
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.2;

    @media (max-width: 700px) {
        text-align: center;
    }

    @media (max-width: 360px) {
        font-size: 1.5rem;
    }
`

const serviceSectionContentSmallTitle = css`
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #1f1f1f;
    font-family: Poppins, sans-serif;
    font-weight: 400;

    @media (max-width: 700px) {
        text-align: center;
    }
`

const serviceSectionContentImage = css`
    opacity: 1;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    transform-style: preserve-3d;
    grid-area: span 1 / span 1 / span 1 / span 1;
    border-radius: 33px;
    padding-right: 0;
    max-width: 100%;
    display: inline-block;
    height: auto;
`

export const WalletSection = () => {
    return (
        <section className={serviceSectionContainer}>
            <div className={serviceSectionContent}>
                <div className={containerText}>
                    <h3 className={titleStyle}>Recibe pagos de tus clientes de manera segura y retira tus fondos con tranquilidad.</h3>
                    <p className={serviceSectionContentSmallTitle}>Recibe pagos en Zelle, Paypal o Transferencias y retira efectivo o compra el repuesto que necesites online o en cualquiera de nuestras tiendas asociadas</p>
                </div>
                <Image width={WalletBanner.width} height={WalletBanner.height} className={serviceSectionContentImage} src={WalletBanner.src} alt="Wallet" />
            </div>
        </section>
    );
}