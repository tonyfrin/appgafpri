import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { ButtonAppMobile } from '../../Button/ButtonAppMobile';
import { InputAppContainer } from '../../Input/InputAppContainer';
import { useTheme } from '../../context/ThemeContext';


const buttonAppMobileContentStyles = css`
    font-size: 1.5em;
    padding: 0.9em;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    text-align: center;
`

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

const loginContainerStyles = css`
    position: fixed;
    bottom: 10%;
    left: 0;
    right: 0;
    z-index: 996;
`;

const loginContentStyles = css`
    display: flex;
    flex-direction: column;
`;

const containerInput = css`
    margin: 20px auto;
`

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`


export const PasswordReset = () => {
    const { useUser } = useTheme();
    const router = useRouter();

    useEffect(() => {
        useUser.attributes.actions.validationEmail(useUser.attributes.states.email);
    }, [useUser.attributes.states.email]); // eslint-disable-line

    useEffect(() => {
        useUser.attributes.actions.validationPasswordResetBotton();
    }, [ useUser.attributes.states.email, useUser.attributes.states.emailValid ]); // eslint-disable-line

    const reset = async () => {
        if (useUser.attributes.actions.validationPasswordResetBotton()) {
            try{
                useUser.pagesPasswordReset.actions.onFetching();
                await useUser.api.actions.passwordReset();
                
            } catch (error) {
                useUser.pagesPasswordReset.actions.onSuccess();
            } finally {
                useUser.pagesPasswordReset.actions.onSuccess();
            }
        }
    }

  return (
    <>
        <div 
            style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1em 0px',
                  width: '90%',
                  margin: 'auto',
                  borderBottom: '1px solid #e1e1e1'
              }}> 
                  <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Recupera tu contraseña</h1>
                  <Link
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                    href='/login'
                  >
                    <FiChevronLeft 
                        className={arrowStyle}
                    />
                  </Link>
        </div>
            <div className={containerInput}>
                <InputAppContainer 
                    inputProps={{
                        type: 'email',
                        placeholder: 'Email',
                        onChange: (e) => useUser.attributes.actions.changeEmail(e.target.value)
                    }}
                />
            </div>
            
        <div className={loginContainerStyles}>
            <div className={loginContentStyles}>
                <ButtonAppMobile title="Recuperar contraseña" 
                    containerProps={{
                        onClick: () => reset(),
                        id: 'password-reset'
                    }}
                />
            </div>
        </div>
     </>
  );
}
