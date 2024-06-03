import React, { useState, KeyboardEvent, useEffect } from 'react';
import { css } from '@emotion/css';
import Image from 'next/image';
import { BUTTON_NEXT_INPUT } from 'gafprilibui';
import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { Loading } from '../Loading';
import { UserAttributesReturn } from '../states/user/useGafpriApiUser';
import { InputAppContainer } from '../Input/InputAppContainer';
import { SelectApp } from '../Select/SelectApp';
import { SitesAttributesReturn } from '../states/sites/useGafpriApiSites';
import { MySitesEmpty } from './MySitesEmpty';

const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const textInfoTitleStyles = css`
  font-size: 0.6em;
  font-weight: 400;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  color: #9e9e9e;
`

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

const photoProfile = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
`

export const MySiteEmployees = ({id}: {id: string | string[] | undefined}) => {
    const { useSites, useUser, useError, useLogin } = useTheme();
    const router = useRouter();
    const [user, setUser] = useState<UserAttributesReturn | null>(null);
    const [emailUser, setEmailUser] = useState<string>('');
    const [fetchingUser, setFetchingUser] = useState<boolean>(false);
    const [site, setSite] = useState<SitesAttributesReturn | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        useSites.attributes.actions.validationButtonNextEmployees();
    }, [user, useSites.attributes.states.permissions, useSites.attributes.states.userId]); // eslint-disable-line

    useEffect(() => {
        if(id && typeof id === 'string'){
            useSites.attributes.actions.setCurrentId(parseInt(id, 10));
        }
    }, [id]); // eslint-disable-line

    useEffect(() => {
        if(id && typeof id === 'string'){
            
            const currentSite = useSites.api.actions.getMySiteById(id);
            setSite(currentSite);
        }
    }, [id, useSites.api.states.mySites]); // eslint-disable-line

    if(id && typeof id !== 'string') { return <Loading />}

    const owner = `${site?.sitesEntity[0].entity.userId}` === `${useLogin.data.states.currentUser?.id}`;

    const getUser = async (event: KeyboardEvent) => {
        if (event.key === "Enter" && emailUser !== '') {
            try{
                setFetchingUser(true);
                const data = await useUser.api.actions.getUserByEmail(emailUser);
                if(data && data.success){
                    setUser(data.item);
                    useSites.attributes.actions.setUserId(data.item.id);
                } else {
                    setUser(null);
                    useSites.attributes.actions.setUserId('');
                    useError.actions.changeError(['No se encontró el usuario.', 'Por favor, verifica el email ingresado.']);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setUser(null);
                useSites.attributes.actions.setUserId('');
                useError.actions.changeError(['No se encontró el usuario.', 'Por favor, verifica el email ingresado.']);
            } finally {
                setFetchingUser(false);
            }
        }
    }

    const add = async () => {
        if (id && typeof id === 'string' &&  useSites.attributes.actions.validationButtonNextEmployees()) {
            try{
                setFetching(true);
                const data = await useSites.api.actions.addEmployees(id);
                if(data && data.success){
                    useSites.api.actions.handleUpdatedMySites(data.item);
                    router.push(`/mis-tiendas/tienda/empleados/list/${id}`);
                } else {
                    useError.actions.changeError(['no se pudo agregar el usuario.', 'Por favor, vuelva a intentarlo.']);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                useError.actions.changeError(['no se pudo agregar el usuario.', 'Por favor, vuelva a intentarlo.']);
            } finally {
                setFetching(false);
            }
        }
    }

    const label = useSites.attributes.states.permissionsOptions.find((item) => item.value === useSites.attributes.states.permissions)?.label || 'Seleccione una opción';
    
    const back = () => {
        router.back();
    }

    return (
        <>
            {owner ?

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '1em auto 100px auto',
                }}>
                    {fetching || site === null ? <Loading /> :
                    <>
                        <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '1em 0px',
                                width: '90%',
                                margin: 'auto',
                                borderBottom: '1px solid #e1e1e1'
                            }}> 
                                <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Agregar Autorizado</h1>
                                <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onClick={back}
                                >
                                <FiChevronLeft 
                                    className={arrowStyle}
                                />
                                </div>
                        </div>
                        
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    width: '100px',
                                    height: '100px',
                                    margin: '1em auto 0px auto'
                                }}
                            >
                                <Image 
                                    src='https://categorygafpri.s3.us-east-2.amazonaws.com/store-default.jpg' 
                                    alt="profile" width={200} height={200} 
                                    className={photoProfile}
                                />
                            </div>
                            <div>
                                <h1 style={{
                                    textAlign: 'center',
                                    fontFamily: 'Poppins',
                                    fontSize: '1.2em',
                                    margin: '0.5em 0',
                                }}>
                                    {`${site?.tradename}`}
                                </h1>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <span style={{
                                    textAlign: 'center',
                                    fontFamily: 'Poppins',
                                    fontSize: '0.8em',
                                    fontWeight: 400,
                                    margin: '0.5em 0',
                                }}>
                                    Billetera No:
                                </span>
                                <span style={{
                                    textAlign: 'center',
                                    fontFamily: 'Poppins',
                                    fontSize: '0.8em',
                                    fontWeight: 600,
                                    margin: '0.5em',
                                }}>
                                    {site?.sitesEntity[0].entity.walletAccount[0].id}
                                </span>
                            </div>
                            <div 
                                    style={{
                                        margin: 'auto',
                                        padding: '0px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {fetchingUser ? 
                                    <Loading 
                                        mainStyles={{
                                            padding: '0px',
                                        }}
                                        divStyle={{
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    /> 
                                    
                                    :  user ?
                                        <>
                                                <div 
                                                    style={{
                                                        width: '80%',
                                                        margin: 'auto',
                                                    }}
                                                >
                                                    <span className={textInfoTitleStyles}>Usuario Agregado</span>
                                                </div>
                                                <InputAppContainer 
                                                    inputProps={{
                                                        value: `${user.name} ${user.lastName ? user.lastName : ''}`,
                                                        type: 'Text',
                                                        readOnly: true,
                                                    }}
                                                    containerStyles={{
                                                    customStyles: 'width: 95%; margin: auto;'
                                                    }}
                                                />
                                        </> : 

                                        <>
                                            <div 
                                                style={{
                                                    width: '80%',
                                                    margin: 'auto',
                                                }}
                                            >
                                                <span className={textInfoTitleStyles}>Email del usuario</span>
                                            </div>
                                            <InputAppContainer 
                                                inputProps={{
                                                    placeholder: 'Email del usuario',
                                                    onChange: (event) => setEmailUser(event.target.value),
                                                    type: 'Text',
                                                    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => getUser(e),
                                                    
                                                }}
                                                containerStyles={{
                                                customStyles: 'width: 95%; margin: auto;'
                                                }}
                                            />
                                        </>
                                    }
                                </div>
                                <div style={{
                                    margin: 'auto',
                                    padding: '0px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '95%'
                                    }}>
                                    <div style={{
                                        width: '85%',
                                        margin: 'auto',
                                    }}>
                                        <span className={textInfoTitleStyles}>Tipo de recarga</span>
                                    </div>
                                    <SelectApp
                                        options={useSites.attributes.states.permissionsOptions}
                                        value={label}
                                        onChange={(e) => useSites.attributes.actions.changePermissions(e)}
                                    />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    margin: '1em auto',
                                    textDecoration: 'none',
                                }}>
                                    <ButtonAppMobile 
                                        title="Autorizar"
                                        containerProps={{
                                            id: `${BUTTON_NEXT_INPUT}sites-employees`,
                                            onClick: () => add(),
                                        }}
                                    />
                                </div>
                        </div>
                    
                    </>}
                </div>
                : <MySitesEmpty />
            }
        </>
    )

}