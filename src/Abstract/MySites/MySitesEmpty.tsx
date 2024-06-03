import React from 'react';
import { IoStorefrontOutline } from 'react-icons/io5';

export const MySitesEmpty = () => {
    
    
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                flexDirection: 'column',
                width: '90%',
                margin: 'auto',
            }}
        >
            <div>   
                <IoStorefrontOutline
                    style={{
                        fontSize: '3em'
                    }}
                />
            </div>
            <p
                style={{
                    margin: '10px 0px 0px 0px',
                    padding: '0px',
                    fontSize: '0.7em',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center'
                }}
            >No tienes tiendas asociadas.</p>
            <p
                style={{
                    margin: '0px',
                    padding: '0px',
                    fontSize: '0.7em',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center'
                }}
            >Por favor, comunicate con <span>Atención al Cliente</span> para crear agregar su tienda</p>
        </div>
    );
};