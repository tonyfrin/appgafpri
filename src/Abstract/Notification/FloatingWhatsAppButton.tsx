import React from 'react';
import { css } from '@emotion/css';
import { FaWhatsapp } from 'react-icons/fa';

const buttonWhatsApp = css`  
    position: fixed;
    bottom: 60px;
    right: 40px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #25D366;
    color: white;
    border: none;
    box-shadow: 0px 1px 20px rgb(255 255 255 / 30%);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1000;

    @media (max-width: 950px) {
        width: 50px;
        height: 50px;
    }

    @media (max-width: 750px) {
        width: 45px;
        height: 45px;
    }

    @media (max-width: 600px) {
        width: 40px;
        height: 40px;
        right: 20px;
        bottom: 40px;
    }

    @media (max-width: 500px) {
        right: 10px;
    }
`;

const iconWhatsApp = css`
    font-size: 40px;

    @media (max-width: 950px) {
        font-size: 35px;
    }

    @media (max-width: 750px) {
        font-size: 30px;
    }

    @media (max-width: 600px) {
        font-size: 28px;
    }
`;

const FloatingWhatsAppButton: React.FC = () => {
  const handleClick = () => {
    // Aquí puedes agregar la acción que desees, como abrir WhatsApp Web
    window.open('https://wa.me/18323145667?text=Hola%21%20necesito%20ayuda%20con%20la%20App%20Gafpri', '_blank'); // Cambia '1234567890' por el número de WhatsApp
  };

  return (
    <button
      onClick={handleClick}
      className={buttonWhatsApp}
    >
      <FaWhatsapp className={iconWhatsApp} />
    </button>
  );
};

export default FloatingWhatsAppButton;
