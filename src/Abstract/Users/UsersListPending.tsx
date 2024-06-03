import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { css, cx } from '@emotion/css'
import { FiChevronLeft } from 'react-icons/fi';
import { formatDate } from '../helpers'
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';
import { UserAttributesReturn } from '../states/user/useGafpriApiUser';

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

const statusButtonStyles = (color?: string, backgroundColor?: string) => css`
    width: fit-content;
    font-size: 0.7em;
    margin: 0.6rem 0px 0px 0px;
    line-height: 1rem;
    font-weight: 400;
    max-width: 18rem;
    overflow: hidden;
    word-break: break-word;
    text-transform: none;
    -webkit-line-clamp: 2;
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    height: auto;
    padding: 0.125rem 0.5rem;
    border-radius: 0.5rem;
    color: ${color || 'rgb(255, 255, 255)'};
    background-color: ${backgroundColor || 'rgb(15, 133, 20)'};
`

export const UsersListPending = () => {
    const { useLogin, useUser } = useTheme();
    const [isReadyUsersPending, setIsReadyUsersPending] = useState<boolean>(false);
    const [usersPending, setUsersPending] = useState<UserAttributesReturn[]>([]);
    const [fetchingUsersPendingMore, setFetchingUsersPendingMore] = useState<boolean>(false);
    const [usersPendingLimit, setUsersPendingLimit] = useState<number>(2);
    const [usersPendingOffset, setUsersPendingOffset] = useState<number>(0);
    const [usersPendingCount, setUsersPendingCount] = useState<number | null>(null);

    const usersPendingPush = (users: UserAttributesReturn[]) => {
        setUsersPending([...usersPending, ...users]);
    }

    const getMoreUsersPending = async () => {
        try {
            setFetchingUsersPendingMore(true);
            const data = await useUser.api.actions.getUserPending(usersPendingOffset, usersPendingLimit);
            if(data && data.success){
                const offset = usersPending.length + data.data.items.length;
                usersPendingPush(data.data.items);
                setUsersPendingCount(data.data.totalCount);
                setUsersPendingOffset(offset);
            }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
            setFetchingUsersPendingMore(false);
        }
    }

    useEffect(() => {
            const fetchUsersPending = async () => {
                try {
                    setIsReadyUsersPending(false);
                    const data = await useUser.api.actions.getUserPending(usersPendingOffset, usersPendingLimit);
                    if(data && data.success){
                        const offset = usersPending.length + data.data.items.length;
                        setUsersPending(data.data.items);
                        setUsersPendingCount(data.data.totalCount);
                        setUsersPendingOffset(offset);
                    } else{
                        setUsersPending([]);
                        setUsersPendingCount(null);
                        setUsersPendingOffset(0);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setUsersPending([]);
                    setUsersPendingCount(null);
                    setUsersPendingOffset(0);
                    setIsReadyUsersPending(true);
                } finally {
                    setIsReadyUsersPending(true);
                }
            }

            fetchUsersPending();
    }, [useLogin.data.states.token]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div 
                style={{
                    margin: '0px auto 6em auto',
                }}
            > 
                {!isReadyUsersPending ? <Loading /> :
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1em 0px',
                            width: '90%',
                            margin: 'auto',
                        }}> 
                            <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Lista de Usuarios por Aprobar</h1>
                            <Link href='/' style={{
                                textDecoration: 'none',
                                display: 'flex',
                                }}>
                                <FiChevronLeft 
                                    className={arrowStyle}
                                />
                            </Link>
                        </div>
                        
                        <div
                            style = {{
                                border: '1px solid #e6e6e6',
                                padding: '10px',
                                borderRadius: '0px 0px 15px 15px',
                                margin: '2em auto',
                                width: '90%',
                                
                            }}
                        >
                                    <h1 style={{textAlign: 'left', padding: '0.3em', width: '95%', margin: 'auto', fontSize: '0.7em'}} className={title1AppStyles}>Usuarios</h1>
                                        
                                        {usersPending.length > 0 ? usersPending.map((user, index) => { 
                                            
                                                return (
                                                        <>
                                                            <div
                                                                style={{
                                                                    border: '0.5px solid #ebebeb',
                                                                    borderRadius: '15px',
                                                                    margin: '0px 0px 2% 0px',
                                                                    backgroundColor: '#fff',
                                                                    fontSize: '0.8em'
                                                                }}
                                                                key={index}
                                                            >
                                                                <Link
                                                                    href="/users/[id]" as={`/users/${user.id}`}
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                        margin: '0px'
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            margin: 'auto',
                                                                            padding: '2em 2%',
                                                                            
                                                                        }}
                                                                    ><div
                                                                            style={{
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                width: '100%',
                                                                                overflow: 'hidden',
                                                                            }}
                                                                        >
                                                                            <span style={{
                                                                                fontWeight: '600',
                                                                                textAlign: 'left',
                                                                                fontFamily: 'Poppins',
                                                                            }}>{`${user.name} ${user.lastName}`}</span>
                                                                            <span style={{
                                                                                fontWeight: '400',
                                                                                textAlign: 'left',
                                                                                color: '#324375',
                                                                                fontFamily: 'Poppins',
                                                                                margin: '0.5em 0px'
                                                                            }}>{user.email}</span>
                                                                            <span
                                                                                style={{
                                                                                    fontSize: '0.7em',
                                                                                    textAlign: 'left'

                                                                                }}
                                                                            >{formatDate(user.createdAt)}</span>
                                                                            <span className={cx(statusButtonStyles('rgb(0, 20, 53)', 'rgb(230, 224, 217)'))}>Pendiente</span>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            
                                                        </>
                                                );
                                        
                                        }) :
                                        <>
                                            <div
                                                style={{
                                                    border: '0.5px solid #ebebeb',
                                                    borderRadius: '15px',
                                                    margin: '0px 0px 2% 0px',
                                                    backgroundColor: '#fff',
                                                    fontSize: '0.8em'
                                                }}  
                                            >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            margin: 'auto',
                                                            padding: '2em 2%',
                                                            
                                                        }}
                                                    >
                                                        <span
                                                        style={{
                                                            width: '100%',
                                                            textAlign: 'center',
                                                            fontWeight: '600',
                                                            
                                                        }}
                                                        >No hay usuarios Pendientes</span>
                                                        
                                                    </div>
                                            </div>
                                        
                                        </> 
                                    
                                    }
                                    {usersPendingCount !== null && usersPendingCount > usersPending.length &&
                                        <div>
                                            {fetchingUsersPendingMore ? 
                                            <Loading 
                                                mainStyles={{
                                                    padding: '0px',
                                                }}
                                                divStyle={{
                                                    border: '3px solid #eee',
                                                    borderTop: '3px solid #077bb4',
                                                    width: '30px',
                                                    height: '30px',
                                                }}
                                                
                                            /> :
                                                <div
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                    onClick={() => getMoreUsersPending()}
                                                >
                                                    <span
                                                        style={{
                                                            textAlign: 'center',
                                                            fontSize: '0.7rem',
                                                            color: '#07b2e7',
                                                            fontWeight: '600'
                                                        }}
                                                    >Ver mas</span>
                                                </div>
                                            }
                                        </div>
                                    }
                        </div>
                    </>
                } 
            </div>
        </>
    )
}


