import React from "react";
import { css } from '@emotion/css';
import { BoxesInfo } from "../Box/BoxesInfo";

const serviceSectionContainer = css`
    margin-top: 2rem;
    margin-bottom: 4rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
`;

const serviceSectionContent = css`
    max-width: 940px;
    margin-left: auto;
    margin-right: auto;
    display: block;
`

const serviceSectionContentSmallTitle = css`
    margin-bottom: 1rem;
    font-family: Poppins, sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
    padding-top: 0;
    padding-bottom: 0;
`

const serviceSectionContentTitle = css`
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
    font-family: Poppins, sans-serif;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;

    @media (max-width: 790px) {
        width: 90%;
        margin: auto;
    }

    @media (max-width: 360px) {
        font-size: 1.5rem;
    }
`

export const ServiceSection = () => {
    return (
        <section className={serviceSectionContainer}>
            <div className={serviceSectionContent}>
                <div className={serviceSectionContentSmallTitle}>¿Qué te ofrece Gafpri?</div>
                <h2 className={serviceSectionContentTitle}>4 Servicios integrados que te facilitan tu trabajo como Técnico en Refrigeración</h2>
                <BoxesInfo/>
            </div>
        </section>
    );
}