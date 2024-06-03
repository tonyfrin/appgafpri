import React from 'react';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { RiCheckboxCircleLine } from 'react-icons/ri';


export function SuccessPasswordReset() {
  const { useUser } = useTheme();

  const returnInit = ():void => {
    useUser.attributes.actions.changeEmail('');
    useUser.pagesPasswordReset.actions.onFetching();
    setTimeout(() => {
      useUser.pagesPasswordReset.actions.infoReset();
    }, 2000); 
  }

  return (
    <>

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
                <RiCheckboxCircleLine
                    style={{
                        fontSize: '3em'
                    }}
                />
            </div>
            <p
                style={{
                    margin: '10px 0px 10px 0px',
                    padding: '0px',
                    fontSize: '0.7em',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center',
                    fontWeight: '600'
                }}
            >Contraseña enviada a tu email.</p>
            <p
                style={{
                    margin: '0px',
                    padding: '0px',
                    fontSize: '0.7em',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center'
                }}
            >{'Por favor, revisa todos tus buzones de correo. Si tienes algún problema para recibir tu contraseña provisional, no dudes en contactarnos a través de WhatsApp al +1 (832) 352-2096. Estaremos encantados de ayudarte.'}</p>
              <Link href="/login" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                margin: '1em 0px'
              }}>
                <ButtonAppMobile 
                  title="Volver al inicio"
                  contentStyles={{
                    fontSize: '1.2em',
                  }}
                  containerProps={{
                    onClick: () => returnInit()
                  }}
                />
              </Link>
        </div>
    </>
  );
}