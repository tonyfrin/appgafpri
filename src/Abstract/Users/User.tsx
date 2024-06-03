import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { css} from '@emotion/css'
import { FiChevronLeft } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { UserAttributesReturn } from '../states/user/useGafpriApiUser';
import { InputAppContainer } from '../Input/InputAppContainer';
import { formatPhoneNumber,  scrollToTop } from '../helpers';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { SelectApp } from '../Select/SelectApp';
import { useRouter } from 'next/router';
import { Error } from '../Error';

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

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

const imageStyle = css`
  transition: all 1s ease 0s;
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  border: 1px solid #ebebeb;
  margin: auto;
  border-radius: 10px;
`;

export const User = ({id}: {id: string | string[] | undefined}) => {
    const router = useRouter();
    const { useLogin, useUser, useError } = useTheme();
    const [isReadyUser, setIsReadyUser] = useState<boolean>(false);
    const [user, setUser] = useState<UserAttributesReturn | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);

    const aproval = async () => {
        if(id && typeof id === 'string') {
            scrollToTop();
            try {
                setFetching(true);
                const data = await useUser.api.actions.userAproval(id);
                if(data && data.success){
                    router.push('/users/pending');
                } else{
                    console.error(data);
                    useError.actions.changeError(['Error al aprobar el usuario']);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                useError.actions.changeError(['Error al aprobar el usuario']);
                setFetching(false);
            } finally {
                setFetching(false);
            }
        }
    }

    const cancel = async () => {
        if(id && typeof id === 'string') {
            scrollToTop();
            try {
                setFetching(true);
                const data = await useUser.api.actions.userCancel(id);
                if(data && data.success){
                    router.push('/users/pending');
                } else{
                    console.error(data);
                    useError.actions.changeError(['Error al cancelar el usuario']);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                useError.actions.changeError(['Error al cancelar el usuario']);
                setFetching(false);
            } finally {
                setFetching(false);
            }
        }
    }

    useEffect(() => {
        if(id && typeof id === 'string') {
            const fetchUser = async () => {
                try {
                    setIsReadyUser(false);
                    const data = await useUser.api.actions.getUserById(id);
                    if(data && data.success){
                        setUser(data.item);
                        useUser.attributes.actions.setEntityId(data.item.entity[0].id);
                        useUser.attributes.actions.setRoleName(data.item.roles.name);
                    } else{
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setUser(null);
                } finally {
                    setIsReadyUser(true);
                }
            }

            fetchUser();
        }
      
    }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div 
                style={{
                    margin: '0px auto 6em auto',
                }}
            > 
            <Error 
                error={useError.states.error}
            />
                {fetching || !isReadyUser || user === null ? <Loading /> :
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1em 0px',
                            width: '90%',
                            margin: 'auto',
                        }}> 
                            <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Usuario</h1>
                            <Link href='/users/pending' style={{
                                textDecoration: 'none',
                                display: 'flex',
                                }}>
                                <FiChevronLeft 
                                    className={arrowStyle}
                                />
                            </Link>
                        </div>
                        
                        <div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>Nombres</span>
                                    </div>
                                    <InputAppContainer 
                                        inputProps={{
                                            
                                            type: 'Text',
                                            value: user?.name || '',
                                            readOnly: true,
                                        }}
                                        containerStyles={{
                                        customStyles: 'width: 95%; margin: auto;'
                                        }}
                                    />
                            </div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>Apellidos</span>
                                    </div>
                                    <InputAppContainer 
                                        inputProps={{
                                            type: 'Text',
                                            value: user?.lastName || '',
                                            readOnly: true,
                                        }}
                                        containerStyles={{
                                        customStyles: 'width: 95%; margin: auto;'
                                        }}
                                    />
                            </div>
                            <div
                                style={{
                                    margin: '1em auto',
                                    padding: '0px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <a href={user?.photo || ''} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        margin: 'auto',
                                        padding: '0px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Image 
                                        className={imageStyle} 
                                        src={user?.photo || ''} 
                                        alt="Category" 
                                        width={300}
                                        height={300}
                                    />
                                </a>
                            </div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>Tipo de documento</span>
                                    </div>
                                    <InputAppContainer 
                                        inputProps={{
                                            type: 'Text',
                                            value: user?.entity[0].documentId[0].typeDocumentId.name || '',
                                            readOnly: true,
                                        }}
                                        containerStyles={{
                                        customStyles: 'width: 95%; margin: auto;'
                                        }}
                                    />
                            </div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>Numero de Documento</span>
                                    </div>
                                    <InputAppContainer 
                                        inputProps={{
                                            type: 'Text',
                                            value: `${user?.entity[0].documentId[0].index ? user.entity[0].documentId[0].index+'-' : ''}${user?.entity[0].documentId[0].digit || ''}`,
                                            readOnly: true,
                                        }}
                                        containerStyles={{
                                        customStyles: 'width: 95%; margin: auto;'
                                        }}
                                    />
                            </div>
                            <div
                                style={{
                                    margin: '1em auto',
                                    padding: '0px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <a href={user?.entity[0].documentId[0].photo || ''} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        margin: 'auto',
                                        padding: '0px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Image 
                                        className={imageStyle} 
                                        src={user?.entity[0].documentId[0].photo || ''} 
                                        alt="Category" 
                                        width={300}
                                        height={300}
                                    />
                                </a>
                            </div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>Email</span>
                                    </div>
                                    <InputAppContainer 
                                        inputProps={{
                                            type: 'Text',
                                            value: `${user?.email || ''}`,
                                            readOnly: true,
                                        }}
                                        containerStyles={{
                                        customStyles: 'width: 95%; margin: auto;'
                                        }}
                                    />
                            </div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>¿Se verificó el Email?</span>
                                    </div>
                                    <InputAppContainer 
                                        inputProps={{
                                            type: 'Text',
                                            value: `${user?.emailConfirmation ? 'Si' : 'No'}`,
                                            readOnly: true,
                                        }}
                                        containerStyles={{
                                        customStyles: 'width: 95%; margin: auto;'
                                        }}
                                    />
                            </div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>Teléfono</span>
                                    </div>
                                    <InputAppContainer 
                                        inputProps={{
                                            type: 'Text',
                                            value: `${formatPhoneNumber(user?.phone) || ''}`,
                                            readOnly: true,
                                        }}
                                        containerStyles={{
                                        customStyles: 'width: 95%; margin: auto;'
                                        }}
                                    />
                            </div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>¿Se verificó el Teléfono?</span>
                                    </div>
                                    <InputAppContainer 
                                        inputProps={{
                                            type: 'Text',
                                            value: `${user?.phoneConfirmation ? 'Si' : 'No'}`,
                                            readOnly: true,
                                        }}
                                        containerStyles={{
                                        customStyles: 'width: 95%; margin: auto;'
                                        }}
                                    />
                            </div>
                            <div style={{
                                margin: 'auto',
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                }}>
                                    <div style={{
                                    width: '80%',
                                    margin: 'auto',
                                    }}>
                                    <span className={textInfoTitleStyles}>Rol</span>
                                    </div>
                                    <SelectApp 
                                        onChange={(e) => useUser.attributes.actions.setRoleName(e)}
                                        value= {useUser.attributes.states.roleName}
                                        options ={useUser.attributes.states.roleNameOptions}
                                    />
                            </div>
                            <div 
                                style={{
                                    margin: 'auto',
                                    padding: '0px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <ButtonAppMobile 
                                    title="Aprobar"
                                    containerProps={{
                                        onClick: aproval,
                                    }}
                                />
                            </div>
                            <div 
                                style={{
                                    margin: 'auto',
                                    padding: '0px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <ButtonAppMobile 
                                    title="Cancelar"
                                    containerStyles={{
                                        backgroundColor: '#C12422',
                                    }}
                                    containerProps={{
                                        onClick: cancel,
                                    }}
                                />
                            </div>
                        </div>
                    </>
                } 
            </div>
        </>
    )
}


