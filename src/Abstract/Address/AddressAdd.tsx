import React, {useEffect, useState} from 'react';
import { css } from '@emotion/css';
import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import { InputAppContainer } from '../Input/InputAppContainer';
import { SelectApp  } from '../Select/SelectApp';
import { useTheme } from '../context/ThemeContext';
import { Loading } from '../Loading';


const title1AppStyles = css`
  font-size: 1.2em;
  padding: 0.9em;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto 0px;
`

const containerButtonCheckOutStyle = css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    box-shadow: 0 0 6px 0 #20212447;
    padding: 1em 0px;
`

export function AddressAdd() {
  const { useAddress, useError, useUser, useProfile} = useTheme();
  const [location, setLocation] = useState<boolean>(false);
  const router = useRouter();

  const changeLocation = () => {
    setLocation(true);
    useAddress.attributes.actions.changeCurrentLocation();
  }

  const labelEntity = useAddress.attributes.states.entityOptions.find(option => option.value === useAddress.attributes.states.entityId)?.label || 'Selecciona una entidad';

  const add = async () => {
    if(useAddress.attributes.actions.validationButton()){
      try {
          useProfile.pages.actions.onFetching();
          const data = await useAddress.api.actions.addAddress();
          if(data && data.success){
            useUser.api.actions.setUser(data.item);
            useAddress.attributes.actions.resetInfo();
            useProfile.pages.actions.onAddressList();
            router.push('/perfil/direcciones');
          } else{
            useError.actions.changeError(['No se pudo agregar la dirección, intente de nuevo']);
            useProfile.pages.actions.onAddressAdd();
          }
      } catch (error) {
        console.log(error);
        useError.actions.changeError(['No se pudo agregar la dirección, intente de nuevo']);
        useProfile.pages.actions.onAddressAdd();
      }
    }
  }

  const returnList = () => {
    useAddress.attributes.actions.resetInfo();
    useProfile.pages.actions.onAddressList();
  }

  useEffect(() => {
    useAddress.attributes.actions.validationAddress1(useAddress.attributes.states.address1);
    useAddress.attributes.actions.validationAddress2(useAddress.attributes.states.address2);
    useAddress.attributes.actions.validationCity(useAddress.attributes.states.city);
    useAddress.attributes.actions.validationButton();
  }, [ useAddress.attributes.states.address1, useAddress.attributes.states.address2, useAddress.attributes.states.city, ]); // eslint-disable-line

  useEffect(() => {
    if(useAddress.attributes.states.entityOptions.length > 0){
      useAddress.attributes.actions.setEntityId(useAddress.attributes.states.entityOptions[0].value);
    }
  }, [useAddress.attributes.states.entityOptions]); // eslint-disable-line

  return (
    <> 
          <div
            style={{
              marginBottom: '220px'
            }}
          >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1em 0px',
                width: '90%',
                margin: 'auto',
            }}> 
                <h1 style={{textAlign: 'center', padding: '0.3em'}} className={title1AppStyles}>Nueva dirección</h1>
                <Link 
                  href='/perfil/direcciones'
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    margin: 'auto 0px',
                  }}
                >
                  <FiChevronLeft 
                      className={arrowStyle}
                      onClick={returnList}
                  />
                </Link>
            </div>

              <div style={{
                margin: ' 5px auto',
                padding: '0px',
                display: 'flex',
              }}>
                <SelectApp
                  options={useAddress.attributes.states.entityOptions}
                  value={labelEntity}
                  onChange={(e) => useAddress.attributes.actions.setEntityId(e)}
                />
              </div>
           
              <InputAppContainer 
                inputProps={{
                  placeholder: 'Dirección',
                  type: 'text',
                  value: useAddress.attributes.states.address1,
                  onChange: (e) => useAddress.attributes.actions.changeAddress1(e.target.value)
                }}
                containerStyles={{
                  margin: ' 5px auto',
                }}
              />

              <InputAppContainer 
                inputProps={{
                  placeholder: 'Continuar Dirección',
                  type: 'text',
                  value: useAddress.attributes.states.address2,
                  onChange: (e) => useAddress.attributes.actions.changeAddress2(e.target.value)
                }}
                containerStyles={{
                  margin: ' 5px auto',
                }}
              />

              <div style={{
                margin: '5px auto',
                padding: '0px',
                display: 'flex',
              }}>
                <SelectApp
                  options={useAddress.attributes.states.cityOptions}
                  value={useAddress.attributes.states.city}
                  onChange={(e) => useAddress.attributes.actions.changeCity(e)}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  margin: 'auto',
                  flexDirection: 'column',
                }}
              >
                {location && !useAddress.attributes.states.latitude && !useAddress.attributes.states.longitude? 
                    <Loading 
                      divStyle={{
                        border: '3px solid #eee',
                        borderTop: '3px solid #077bb4',
                        width: '40px',
                        height: '40px',
                      }}
                      mainStyles={{
                        padding: '5%'
                      }}
                    /> 
                  : 
                  <>
                    {useAddress.attributes.states.latitude && useAddress.attributes.states.longitude ?
                        <>
                          <span
                            style={{
                              fontSize: '0.8em',
                              fontFamily: 'Poppins',
                              margin: '1em auto',
                              textAlign: 'center',
                              width: '90%',
                              fontWeight: '600'
                            }}
                          >Se agregó correctamente su posición</span> 
                          <ButtonAppMobile 
                              title='Volver agregar tu posición'
            
                              containerStyles={{
                                backgroundColor: '#314577',
                              }}
                              containerProps={{
                                onClick: () => changeLocation()
                              }}
                              contentStyles={{
                                fontSize: '1.2em',
                              }}
                            />
                        </>
                        : 
                        <>
                          <span style={{
                            fontSize: '0.6em',
                            fontFamily: 'Poppins',
                            margin: 'auto',
                            textAlign: 'center',
                            width: '90%',
                          }}>Si te encuentras en la dirección, agrega la posición en el mapa</span>
                          <ButtonAppMobile 
                            title='Agrega tu posición'
          
                            containerStyles={{
                              backgroundColor: '#314577',
                            }}
                            containerProps={{
                              onClick: () => changeLocation()
                            }}
                            contentStyles={{
                              fontSize: '1.2em',
                            }}
                          />
                        </>
                      }
                  </>
                }
              </div>
            
            <div className={containerButtonCheckOutStyle}>
              <ButtonAppMobile 
                title="Agregar Dirección"
                containerProps={{
                  id: 'add-update-address-button',
                  onClick: () => add()
                }}
              />
            </div>
          </div>
    </>
  );
}