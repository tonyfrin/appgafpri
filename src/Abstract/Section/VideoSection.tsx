import React from "react";
import { css } from '@emotion/css';
import { ButtonAppMobile } from "../Button/ButtonAppMobile";
import Link from "next/link";
import Header from "../assets/fondo-inicio3.jpg";
import Image from "next/image";
import { AiFillApple, AiFillAndroid } from 'react-icons/ai';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FaGlobe } from 'react-icons/fa';


const videoSectionContainer = css`
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
    height: 105vh;
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
    color: #334376;
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
    color: #334376;
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
                <Image width={Header.width}  height={Header.height} src={Header.src} className={videoSectionContentVideo} alt='Gafpri' />
                
             
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
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '16px',
                                padding: '16px 0px',
                            }}>
                                <a href="https://play.google.com/store/apps/details?id=com.gafpri.store" 
                                    target="_blank" rel="noopener noreferrer" 
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        backgroundColor: '#06b2e7',
                                        color: 'white',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        width: '100%',
                                        maxWidth: '300px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <AiFillAndroid style={styles.icon} />
                                    <span>Descarga GAFPRI en Play Store</span>
                                </a>
                                <a href="https://apps.apple.com/us/app/gafpri-store/id6736999329?l=es-MX" 
                                    target="_blank" rel="noopener noreferrer" 
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        backgroundColor: '#06b2e7',
                                        color: 'white',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        width: '100%',
                                        maxWidth: '300px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <AiFillApple style={styles.icon} />
                                    <span>Descarga GAFPRI en App Store</span>
                                </a>
                                <Link 
                                    href='/login'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        backgroundColor: '#06b2e7',
                                        color: 'white',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        width: '100%',
                                        maxWidth: '300px',
                                        textAlign: 'left',
                                    }}
                                >
                                    <FaGlobe style={styles.icon} />
                                    <span>Inicia sesión desde la web</span>
                                </Link>
                            </div>
                            </div>
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
  