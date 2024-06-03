import React from "react";
import { css } from '@emotion/css';
import { ButtonAppMobile } from "../Button/ButtonAppMobile";
import Link from "next/link";

const videoSectionContainer = css`
    background-color: rgba(0, 0, 0, .75);
    border-radius: 0;
    justify-content: center;
    align-items: center;
    height: 600px;
    padding-top: 0;
    display: flex;
    position: relative;
`;

const videoSectionContentVideo = css`
    object-fit: cover;
    z-index: -100;
    background-position: 50%;
    background-size: cover;
    width: 100%;
    max-width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: -100%;
    bottom: -100%;
    left: -100%;
    right: -100%;

    @media (max-width: 991px) {
        width: auto;
    }
`;

const videoSectionContentTitle = css`
    justify-content: center;
    align-items: center;
    margin-top: 0;
    display: flex;
    max-width: 940px;
    margin-left: auto;
    margin-right: auto;
`;

const videoSectionSubContentTitle = css`
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    grid-auto-columns: 1fr;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: .75fr .5fr;
    align-items: center;
    justify-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 600px) {
        display: block;
        margin-right: 50px;
    }

    @media (max-width: 415px) {
        margin-right: 0;
    }
`

const videoSectionContentTitleContainer = css`
    grid-area: span 1 / span 1 / span 1 / span 1;
    align-self: stretch;
    box-sizing: border-box;

    @media (max-width: 790px) {
        margin-left: 30px;
    }

    @media (max-width: 470px) {
        margin-left: 0;
    }

`;

const videoSectionContentTitleText = css`
    color: #fff;
    text-align: left;
    font-size: 3.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;

    @media (max-width: 470px) {
        font-size: 2.8rem;
    }

    @media (max-width: 360px) {
        font-size: 2.5rem;
    }
`

const videoSectionContentTitleTextSpan = css`
    color: #07b2e7;
    margin-left: 20px;

    @media (max-width: 600px) {
        margin-left: 0;
    }
`

const videoSectionContentTitleTextP = css`
    color: #EEEEEE;
    margin-top: 1rem;
    margin-bottom: 2rem;
    margin-right: 1rem;
    font-family: Poppins, sans-serif;
    font-size: 1rem;
    font-weight: 300;
`;



export const VideoSection = (): JSX.Element => {
      
    return (
        <>
            <div className={videoSectionContainer}>
                <video className={videoSectionContentVideo} autoPlay loop muted>
                    <source src='https://categorygafpri.s3.us-east-2.amazonaws.com/tecnicos-refrigeracion-gafpri-hvac.mp4' type="video/mp4" />   
                </video>
                <div className={videoSectionContentTitle}>
                    <div className={videoSectionSubContentTitle}>
                        <div className={videoSectionContentTitleContainer}>
                            <h1 className={videoSectionContentTitleText}>
                                <span>¿Eres técnico en Refrigeración?</span>
                                <span className={videoSectionContentTitleTextSpan}>Estos servicios son para ti</span>
                            </h1>
                            <div className={videoSectionContentTitleTextP}>
                                GAFPRI es la solución integral diseñada para técnicos en refrigeración
                            </div>
                            <div>
                            <Link href='/login'>
                                <ButtonAppMobile 
                                    title="Ingresar" 
                                    containerStyles={{
                                        width: '40%',
                                        borderRadius: '8px',
                                    }} 

                                    contentStyles={{
                                        padding: '0.7em',
                                        custom: `
                                            @media (max-width: 800px) {
                                                font-size: 1.2em;
                                            }

                                            @media (max-width: 360px) {
                                                font-size: 1em;
                                            }
                                        `
                                    }}
                                />
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}