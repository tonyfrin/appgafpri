import React from "react";
import { css } from '@emotion/css';
import { ServiceCarousel } from '../Carousel/ServiceCarousel';
import { CarouselItem } from '../Carousel/Carousel';
import { ButtonCarouselService } from '../Button/ButtonCarouselService';
import Filtro from '../assets/img/filtro-portada.jpg'

const serviceSectionContainer = css`
    margin: 30px 0px 0px 0px;
`;

const serviceSectionContent = css`
    width: 90%;
    margin: 0 auto 30px auto;
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

    @media (max-width: 360px) {
        font-size: 1.5rem;
    }
`

const industrialItems = [
        {
            title: 'Filtros',
            src: Filtro.src,
            href: '/'
        },

        {
            title: 'Motores',
            src: 'https://categorygafpri.s3.us-east-2.amazonaws.com/Motores-us-motor.png',
            href: '/'
        },
        {
            title: 'Protectores',
            src: 'https://categorygafpri.s3.us-east-2.amazonaws.com/protectores.png',
            href: '/'
        },
        {
            title: 'Axiales',
            src: 'https://categorygafpri.s3.us-east-2.amazonaws.com/Motor-Axial-web.png',
            href: '/'
        },
        {
            title: 'Elementos',
            src: 'https://categorygafpri.s3.us-east-2.amazonaws.com/elemento.png',
            href: '/'
        },

        {
            title: 'Válvulas',
            src: 'https://categorygafpri.s3.us-east-2.amazonaws.com/valvula-expansion.png',
            href: '/'
        },
    ];


export const StoreSection = () => {
    return (
        <section className={serviceSectionContainer}>
            <div className={serviceSectionContent}>
                <div className={serviceSectionContentSmallTitle}>La gama de repuestos de refrigeración más amplia</div>
                <h2 className={serviceSectionContentTitle}>En Gafpri encuentras el repuesto que buscas</h2>
                <ServiceCarousel >
                    {
                        industrialItems.map(( term, index ) => {
                            return(
                            <CarouselItem key={index} >
                                <ButtonCarouselService link={term.href} src={term.src} title={term.title}/>
                            </CarouselItem>
                        )})
                    }
                </ServiceCarousel>
            </div>
        </section>
    );
}