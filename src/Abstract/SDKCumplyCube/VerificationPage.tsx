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

export function VerificationPage({ token }: VerificationPageProps) {
  const hasInitialized = useRef(false);

  // Maneja si estamos esperando a que se inicialice el SDK
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      setIsLoading(true);

      // Cargar el SDK de ComplyCube
      const script = document.createElement("script");
      script.src = "https://assets.complycube.com/web-sdk/v1/complycube.min.js";
      script.async = true;
      script.onload = () => {
        setIsLoading(false);
        console.log("ComplyCube SDK loaded.");
      };
      document.head.appendChild(script);

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.complycube.com/web-sdk/v1/style.css";
      document.head.appendChild(link);
    }
  }, []);

  const startVerification = () => {
    if (window.ComplyCube) {
      const complycube = window.ComplyCube.mount({
        token,
        onComplete: function (data: any) {
          console.log("Capture complete", data);
        },
        onError: function (error: any) {
          console.error("Verification error", error);
        },
      });
    } else {
      console.error("ComplyCube SDK is not loaded.");
    }
  };

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
          <IoArrowBack style={{ fontSize: 18 }} />
        </button>
        <h3>Verification in ComplyCube</h3>
      </div>

      <p style={{ margin: "20px 0", fontSize: "16px", lineHeight: "1.5", textAlign: "center" }}>
        {'By clicking on the "Start Verification" button, you will be redirected to ComplyCube, the company responsible for identity and KYC verification. Gafpri does not collect any selfies or document photos; ComplyCube handles the entire verification process securely and independently.'}
      </p>

      <div id="complycube-mount" style={{ marginBottom: "20px" }}></div>

      <form
        id="verification-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {isLoading && <Loading />}

        <ButtonAppMobile
          title="Start Verification"
          containerProps={{ 
            type: "button",
            onClick: startVerification,
          }}
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
      <Modal open={isModal}>
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
            <div style={{ margin: "10px 0px 0px 0px" }}>
              <div style={{ padding: "0px 0px 10px 0px" }}>
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
                    setIsModal(false);
                  },
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
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
