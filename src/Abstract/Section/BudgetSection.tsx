import React from "react";
import { css } from '@emotion/css';
import Image from "next/image";
import Header from "../assets/fondo-inicio3.jpg";
import { AiFillApple, AiFillAndroid} from 'react-icons/ai';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import ImageCarousel from "../Carousel/ImageCarousel";
import handPhone from "../assets/img/celular-en-mano-gafpri-store.png";
import Buscador from "../assets/gifs/buscador-gafpri-store.gif";

const mainContainer = css`  
    background-color: #25467d;
    width: 100%;
`;

const titleContainer = css`  
  width: 60%;
  margin: auto;

    @media (max-width: 950px) {
        width: 95%;
        margin: auto;
    }


`;

const title = css`  
    color: #fff;
    text-align: center;
    font-size: 36px;
    margin: 0px;
    font-weight: 700;

    @media (max-width: 950px) {
        padding-top: 1em;
        font-size: 24px;
    }

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

const contentContainer = css`  
    width: 100%;
    display: flex;
    flex-direction: row-reverse;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

const contentLeftContainer = css`  
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

        @media (max-width: 750px) {
            width: 100%;
        }
`;

const contentLeftTitle = css`  
    color: #fff;
    text-align: left;
    font-size: 24px;
    font-weight: 700;

    @media (max-width: 950px) {
        font-size: 20px;
    }

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;


const contentRightContainer = css`  
    width: 50%;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 750px) {
         width: 100%;
         justify-content: center;
    }
`;

const contentRightImage = css`  
    width: 100%;
    height: auto;
`;

const buttonStoreContainer = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 0px;

     @media (max-width: 750px) {
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

    @media (max-width: 750px) {
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

    @media (max-width: 750px) {
        margin-right: 0px;
        font-size: 60px;
    }

    @media (max-width: 450px) {
        font-size: 40px;
    }
`;

const contentTwoContainer = css`  
    width: 100%;
    display: flex;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

const contentTwoLeftContainer = css`  
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

        @media (max-width: 750px) {
            width: 100%;
        }
`;

const contentTwoLeftTitle = css`  
    color: #fff;
    text-align: left;
    font-size: 24px;
    font-weight: 700;

    @media (max-width: 950px) {
        font-size: 20px;
    }
    
    @media (max-width: 750px) {
        text-align: center  ;
    }

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

const contentTwoLeftSubTitle = css`  
    color: #fff;
    text-align: left;
    font-size: 18px;
    font-weight: 400;
    margin: 0px;
    padding-left: 15px;
    padding-right: 15px;

    @media (max-width: 950px) {
        font-size: 14px;
    }

    @media (max-width: 750px) {
        text-align: center;
        margin-bottom: 15px;
    }

    @media (max-width: 600px) {
        font-size: 10px;
    }
`;


const contentTwoRightContainer = css`  
    width: 50%;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 750px) {
         width: 100%;
         justify-content: center;
    }
`;

const contentTwoRightImage = css`  
    width: 80%;
    height: auto;
`;

const contentThreeContainer = css`  
    width: 100%;
    display: flex;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

const contentThreeLeftTitle = css`  
    color: #fff;
    text-align: left;
    font-size: 24px;
    font-weight: 700;
    padding-top: 2em;

    @media (max-width: 950px) {
        font-size: 20px;
    }
    
    @media (max-width: 750px) {
      
        text-align: center  ;
    }

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

const contentThreeLeftSubTitle = css`  
    color: #fff;
    text-align: left;
    font-size: 18px;
    font-weight: 400;
    margin: 0px;

    @media (max-width: 950px) {
        font-size: 14px;
    }

    @media (max-width: 750px) {
        text-align: center;
        margin-bottom: 15px;
    }

    @media (max-width: 600px) {
        font-size: 10px;
    }
`;


const contentThreeRightContainer = css`  
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

const buttonStoreThree = css`
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
    margin-left: 0.5em;
    margin-right: 0px;
    padding: 6px 10px;

    @media (max-width: 450px) {
        font-size: 12px;
    }

     @media (max-width: 400px) {
        gap: 5px;
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

const iconStoreThree = css`
    margin-right: 8px;
    font-size: 40px;

    @media (max-width: 750px) {
        font-size: 30px;
        margin-right: 0px;
    }

    @media (max-width: 450px) {
        font-size: 25px;
    }
`;

const titleThree = css`  
    color: #fff;
    text-align: center;
    font-size: 36px;
    margin: 0px;
    font-weight: 700;
    padding-top: 2em;

    @media (max-width: 950px) {
        font-size: 24px;
    }

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;






export const BudgetSection = (): JSX.Element => {


      
    return (
        <>
            <div className={mainContainer}>
               <div
                className={titleContainer}
               >
                <h1
                className={title}
                >¿Quieres saber los precios?</h1>
               </div>
               <div
                className={contentContainer}
               >
                <div
                    className={contentLeftContainer}
                >
                    <h3
                        className={contentLeftTitle}
                    >1. Descarga el App y regístrate.</h3>
                     <div className={buttonStoreContainer}>
                        <a href="https://play.google.com/store/apps/details?id=com.gafpri.store" 
                            target="_blank" rel="noopener noreferrer" 
                            className={buttonStore}
                        >
                            <AiFillAndroid className={iconStore} />
                            <span>Descarga GAFPRI en Play Store</span>
                        </a>
                        <a href="https://apps.apple.com/us/app/gafpri-store/id6736999329?l=es-MX" 
                            target="_blank" rel="noopener noreferrer" 
                            className={buttonStore}
                        >
                            <AiFillApple className={iconStore} />
                            <span>Descarga GAFPRI en App Store</span>
                        </a>
                    </div>
                </div>
                <div
                    className={contentRightContainer}
                >
                    <Image 
                        alt="Gafpri store App"
                        src={handPhone.src}
                        height={300}
                        width={300}
                        className={contentRightImage}
                    />
                </div>
               </div>
               <div
                className={contentTwoContainer}
               >
                <div
                    className={contentTwoLeftContainer}
                >
                    <h3
                        className={contentTwoLeftTitle}
                    >2. Buscador de repuesto.</h3>
                    <p className={contentTwoLeftSubTitle}>Escribe el nombre o palabra clave del repuesto y ¡Listo! Precios y disponibilidad en tiempo real.</p>
                </div>
                <div
                    className={contentTwoRightContainer}
                >
                    <Image 
                        alt="Gafpri store App"
                        src={Buscador.src}
                        height={300}
                        width={300}
                        className={contentTwoRightImage}
                        unoptimized
                    />
                </div>
               </div>
               <h1
                className={titleThree}
                >¡Gafpri te lo hace fácil!</h1>
               <div
                className={contentThreeContainer}
               >
                <div
                    className={contentThreeRightContainer}
                >
                     <h3
                        className={contentThreeLeftTitle}
                    >¿Necesitas Ayuda?</h3>
                    <p className={contentThreeLeftSubTitle}>Escríbenos al WhatsApp de asistencia al usuario y con mucho gusto te atenderemos.</p>
                    <div className={buttonStoreContainer}>
                        <a href="https://wa.me/18323145667?text=Hola%21%20necesito%20ayuda%20con%20la%20App%20Gafpri" 
                            target="_blank" rel="noopener noreferrer" 
                            className={buttonStoreThree}
                        >
                            <AiOutlineWhatsApp className={iconStoreThree} />
                            <span>{'+1 (832) 314-5667'}</span>
                        </a>
                    </div>
                </div>
               </div>
            </div>
        </>
    )
}
  