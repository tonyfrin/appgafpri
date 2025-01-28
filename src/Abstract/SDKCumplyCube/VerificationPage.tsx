import { useEffect, useRef, useState } from "react";
import { cx, css } from '@emotion/css';
import { Loading } from "../Loading";
import { ButtonAppMobile } from "../Button/ButtonAppMobile";
import { IoArrowBack } from "react-icons/io5";

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
  language: 'es' | 'en';  // Define el tipo como un literal
};

export function VerificationPage({ token, language }: VerificationPageProps) {
  const hasInitialized = useRef(false);

  // Maneja si estamos esperando a que se inicialice el SDK
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      setIsLoading(true);

      // Solicitar permisos para la cámara
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          // Si los permisos se otorgan, cargar el SDK
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
        })
        .catch(error => {
          console.error('Camera permission denied', error);
          setIsLoading(false);
        });
    }
  }, []);

  const startVerification = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          // Si los permisos de la cámara fueron concedidos, proceder con la verificación
          if (window.ComplyCube) {
            const complycube = window.ComplyCube.mount({
              token,
              stages: [
                'intro',
                'userConsentCapture',
                {
                  name: "faceCapture",
                  options: {
                    mode: "photo",
                  },
                },
                {
                  name: "documentCapture",
                  options: {
                    crossDeviceOnly: true,
                    documentTypes: {
                      passport: true,
                      national_identity_card: true,
                      residence_permit: { country: "VE" },
                    },
                  },
                },
                {
                  name: "completion",
                  options: {
                    heading: texts[language].successTitle,
                    message: [texts[language].successSubtitle],
                  },
                },
              ],
              language,
              onExit: function () {
                window.location.href = 'gafpristore://store';
              },
              onModalClose: function () {
                window.location.href = 'gafpristore://store';
              },
              onComplete: function (data: any) {
                console.log("Capture complete", data);
                if (window.ReactNativeWebView) {
                  const dataToSend = JSON.stringify({
                    action: 'completeWebView',
                    data
                  });
                  window.ReactNativeWebView.postMessage(dataToSend);
                }
              },
              onError: function (error: any) {
                console.error("Verification error", error);
                if (window.ReactNativeWebView) {
                  const dataToSend = JSON.stringify({ action: 'closeWebView' });
                  window.ReactNativeWebView.postMessage(dataToSend);
                }
              },
            });
          } else {
            console.error("ComplyCube SDK is not loaded.");
          }
        })
        .catch(error => {
          console.error('Permission to access camera denied:', error);
        });
    } else {
      console.error('Browser does not support media devices');
    }
  };

  const texts = {
    en: {
      verificationTitle: 'Verification in ComplyCube',
      verificationDescription: 'By clicking on the "Start Verification" button, you will be redirected to ComplyCube, the company responsible for identity and KYC verification. Gafpri does not collect any selfies or document photos; ComplyCube handles the entire verification process securely and independently.',
      startVerification: 'Start Verification',
      successTitle: 'Verification Sent',
      successSubtitle: 'Your verification has been successfully sent. You will shortly receive an email with the results.',
    },
    es: {
      verificationTitle: 'Verificación en ComplyCube',
      verificationDescription: 'Al hacer clic en el botón "Iniciar Verificación", será redirigido a ComplyCube, la empresa responsable de la verificación de identidad y KYC. Gafpri no recopila selfies ni fotos de documentos; ComplyCube maneja todo el proceso de verificación de manera segura e independiente.',
      startVerification: 'Iniciar Verificación',
      successTitle: 'Verificación Enviada',
      successSubtitle: 'Tu verificación ha sido enviada con éxito. En breve recibirás un correo electrónico con los resultados.',
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
        <h3>{texts[language].verificationTitle}</h3>
      </div>

      <p style={{ margin: "20px 0", fontSize: "16px", lineHeight: "1.5", textAlign: "center" }}>
        {texts[language].verificationDescription}
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
          title={texts[language].startVerification}
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
    </div>
  );
}
