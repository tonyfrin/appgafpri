import React from "react";
import { css } from '@emotion/css';
import Header from "../assets/fondo-inicio3.jpg";
import { AiFillApple, AiFillAndroid } from 'react-icons/ai';
import ImageCarousel from "../Carousel/ImageCarousel";

const videoSectionContainer = css`
  background-color: #25467d; /* Color de fondo para áreas no cubiertas */
  background-image: url(${Header.src}); /* Imagen de fondo */
  background-size: cover; /* Escala la imagen para cubrir el área */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  
  width: 100%; /* Ancho del contenedor */
`;


const videoSectionContentTitle = css`
    justify-content: center;
    align-items: center;
    margin-top: 0;
    display: flex;
    width: 100%;
`;

const videoSectionSubContentTitle = css`
    display: flex;
    width: 100%;

     @media (max-width: 950px) {
        flex-direction: column;
    }
`

const videoSectionContentTitleContainer = css`
    width: 50%;
    padding: 5em;

     @media (max-width: 950px) {
         width: 100%;
        padding: 1em 0px 0px 0px;
    }


            
`;

const videoSectionContentImageContainer = css`
    width: 50%;
    

     @media (max-width: 950px) {
         width: 100%;
    }
`;

const videoSectionContentTitleText = css`
    color: #334376;
    text-align: left;
    font-size: 3.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;

    @media (max-width: 950px) {
        margin-left: 1em;
        margin-right: 1em;
    }

    @media (max-width: 600px) {
        font-size: 1.5rem;
    }

`

const videoSectionContentTitleTextSpan = css`
    color: #07b2e7;
    margin-left: 20px;

     @media (max-width: 950px) {
        margin-left: 1em;
        margin-right: 1em;
    }

    @media (max-width: 600px) {
        margin-left: 0;
    }
`

const videoSectionContentTitleTextP = css`
    color: #334376;
    margin-top: 1rem;
    margin-bottom: 2rem;
    margin-right: 1rem;
    font-family: Poppins, sans-serif;
    font-size: 1rem;
    font-weight: 400;

    @media (max-width: 950px) {
        margin-left: 1em;
        margin-right: 1em;
    }

     @media (max-width: 600px) {
         margin-bottom: 1rem;
         font-size: 0.8rem;
    }


`;

const buttonStoreContainer = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 0px;

     @media (max-width: 600px) {
         flex-direction: row;
         justify-content: center;
    }


`;

const buttonStore = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #06b2e7;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    width: 100%;
    max-width: 300px;
    text-align: center;

     @media (max-width: 950px) {
        margin-left: 1em;
        margin-right: 1em;
    }

    @media (max-width: 600px) {
        margin-left: 0.5em;
        margin-right: 0px;
        padding: 6px 10px;
        width: 40%;
        max-width: 40%;
    }

    @media (max-width: 450px) {
        font-size: 12px;
    }

     @media (max-width: 400px) {
        gap: 5px;
        max-width: 38%;
        width: 38%;
    }

    @media (max-width: 350px) {
        font-size: 10px;
    }

    @media (max-width: 310px) {
        font-size: 8px;
        margin-left: 0.3em;
        padding: 4px 6px;
    }

    
`;

const iconStore = css`
    margin-right: 8px;
    font-size: 40px;

    @media (max-width: 600px) {
        margin-right: 0px;
        font-size: 60px;
    }

    @media (max-width: 450px) {
        font-size: 40px;
    }
`;






export const VideoSection = (): JSX.Element => {

    const images: string[] = [
        'https://categorygafpri.s3.us-east-2.amazonaws.com/protector1.png',
        'https://s3.us-east-2.amazonaws.com/gafpristore.com/image/GMCC.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/04-2060.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/04-2152.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/01-591.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/protector2.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/01-079.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/protector6.png',
        'https://s3.us-east-2.amazonaws.com/gafpristore.com/image/GMCC.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/01-119.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/04-2044.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/04-2027.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/09-1320.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/02-1006.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/07-1508.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/06-2508.png',
        'https://categorygafpri.s3.us-east-2.amazonaws.com/protector4.png',
      ];

        const trackLeadEvent = (platform: string) => {
            if (window.fbq) {
                window.fbq('track', 'Lead', { platform });
            }
        };
      
    return (
        <>
            <div className={videoSectionContainer}>
                <div className={videoSectionContentTitle}>
                    <div className={videoSectionSubContentTitle}>
                        <div className={videoSectionContentTitleContainer}>
                            <h1 className={videoSectionContentTitleText}>
                                <span style={{color: '#FFF'}}>Todo en refrigeración <span style={{color: '#06b2e7'}}>con Gafpri.</span></span>
                                <span className={videoSectionContentTitleTextSpan}></span>
                            </h1>
                            <div className={videoSectionContentTitleTextP} style={{color: '#FFF'}}>
                            Ahora compra tus repuestos de refrigeración de forma rápida y fácil desde tu móvil. 
                            </div>
                            <div>
                            <div className={buttonStoreContainer}>
                                <a 
                                    href="https://play.google.com/store/apps/details?id=com.gafpri.store"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={buttonStore}
                                    onClick={() => trackLeadEvent('Google Play')}
                                >
                                    <AiFillAndroid className={iconStore} />
                                    <span>Descarga GAFPRI en Play Store</span>
                                </a>
                                <a 
                                    href="https://apps.apple.com/us/app/gafpri-store/id6736999329?l=es-MX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={buttonStore}
                                    onClick={() => trackLeadEvent('App Store')}
                                >
                                    <AiFillApple className={iconStore} />
                                    <span>Descarga GAFPRI en App Store</span>
                                </a>
                            </div>
                            </div>
                        </div>
                        <div
                            className={videoSectionContentImageContainer}
                        >
                            <ImageCarousel 
                                images={images}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6A1B9A',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      width: '100%',
      maxWidth: '300px',
      textAlign: 'center',
    },
    icon: {
      marginRight: '8px',
      fontSize: '40px',
    },
  };
  