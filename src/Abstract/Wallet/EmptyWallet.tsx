import React from 'react';
import { IoWalletOutline } from 'react-icons/io5';

export const EmptyWallet = () => {
    
    
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
                <IoWalletOutline 
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
            >No tienes cuentas de billetera asociadas.</p>
            <p
                style={{
                    margin: '0px',
                    padding: '0px',
                    fontSize: '0.7em',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center'
                }}
            >Por favor, comunicate con <span>Atención al Cliente</span> para crear una cuenta</p>
        </div>
    );
};