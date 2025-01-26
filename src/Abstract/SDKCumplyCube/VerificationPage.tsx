
import { useEffect, useRef, useState } from "react";
import { cx, css } from '@emotion/css';
import { Loading } from "../Loading";
import { ButtonAppMobile } from "../Button/ButtonAppMobile";
import { IoArrowBack } from "react-icons/io5";
import { Modal } from "../Modal/Modal";


const mainContainerStyle = css`
  max-width: 600px; 
  width: 90%;
  margin: 0px auto;

`;

const buttonBackStyle = css`
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 10px;

  @media (max-width: 600px) {
    padding: 8px;
    border-radius: 8px;
  }

`;

type VerificationPageProps = {
  token: string;
};

export function VerificationPage({token}: VerificationPageProps) {
  const hasInitialized = useRef(false);


  // Maneja si estamos esperando a que se inicialice el SDK
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

 
  

  return (
    <div className={mainContainerStyle}>
      <div
        style={{
          display: 'flex',
          margin: "20px auto",
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: "1px solid #f2f2f2"
        }}
      >
        <button
        className={buttonBackStyle}
        onClick={() => {
          if (window.ReactNativeWebView) {
            const dataToSend = JSON.stringify({
              action: 'closeWebView',
            });
            window.ReactNativeWebView.postMessage(dataToSend);
          }
        }}
        >
          <IoArrowBack style={{fontSize: 18}}/>
        </button>
        <h3>{token}</h3>

      </div>

      <form
        id="card-payment"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* 
          Mientras isLoading sea true, mostramos <Fetching />,
          al estar listo, mostramos <div id="card-container" />
        */}
        {isLoading && (
          <Loading />
        ) }
          <div id="card-container" style={{ marginBottom: "20px", display: isLoading ? "none" : "block"}} />
        

        <ButtonAppMobile
          title="Save"
          containerProps={{ type: "submit" }}
          contentStyles={{
            fontSize: '18px',
            padding: '10px',
            
          }}
          containerStyles={{
            borderRadius: '10px',
            width: '100%'
          }}
        />
      </form>

      <div id="payment-status-container" style={{ marginTop: "20px" }}></div>
      <Modal
        open={isModal}
      >
       <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
       }}>
          <div style={{
            backgroundColor: '#f1f1f1',
            padding: '20px 20px 50px 20px',
            borderRadius: '30px 30px 0px 0px'
          }}>
            
            <div
              style={{
                display: 'flex',
                margin: "0px auto",
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: "1px solid #bebebe"
              }}
            >
              <h3>Error adding card</h3>
            </div>
            <div
              style={{
                margin: "10px 0px 0px 0px",
              }}
            >
              <div
              style={{
                padding: "0px 0px 10px 0px",
              }}
              >
                <span>Check with your bank or try another card.</span>
              </div>
              
              <ButtonAppMobile 
                title="Try Again"
                contentStyles={{
                  fontSize: '18px',
                  padding: '10px',
                  
                }}
                containerStyles={{
                  borderRadius: '10px',
                  width: '100%'
                }}
                containerProps={{
                  onClick: () => {
                    setIsModal(false);  // luego cierra el modal
                  }
                }}
                
              />
              <ButtonAppMobile 
              
                title="Close"
                contentStyles={{
                  fontSize: '18px',
                  padding: '10px',

                  
                }}
                containerStyles={{
                  borderRadius: '10px',
                  width: '100%',
                  backgroundColor: '#c12429',
                  
                }}
                containerProps={{
                  onClick: () => {
                    if (window.ReactNativeWebView) {
                      const dataToSend = JSON.stringify({
                        action: 'closeWebView',
                      });
                      window.ReactNativeWebView.postMessage(dataToSend);
                    }
                }}}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
