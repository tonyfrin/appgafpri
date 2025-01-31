import { useEffect, useRef, useState } from "react";
import { cx, css } from '@emotion/css';
import { gafpriFetch } from '../helpers';
import { Loading } from "../Loading";
import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5";
import { ENTITY_ROUTE } from "../constants";

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
  const router = useRouter();

  // Maneja si estamos esperando a que se inicialice el SDK
  const [isLoading, setIsLoading] = useState(false);

  const onComplete = async (data: any) => {
     const resp = await gafpriFetch({
        initMethod: 'PATCH',
        initRoute: `${ENTITY_ROUTE}/reception-comply-cube`,
        initCredentials: {
          token,
          data
        }
      });
      alert(`${resp.success}`);
  }

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
                driving_license: true,
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
          returnInit();
        },
        onModalClose: function () {
          returnInit();
        },
        onComplete: async function (data: any) {
          await onComplete(data)
          setTimeout(() => {
              returnInit();
          }, 5000);
        },
        onError: function (error: any) {
          console.error("Verification error", error);
          returnInit();
        },
      });
    } else {
      console.error("ComplyCube SDK is not loaded.");
    }
  };

  const returnInit = () => {
    if (window.ComplyCube && typeof window.ComplyCube.unmount === "function") {
        window.ComplyCube.unmount();
    }

    window.location.href = 'gafpri://';


    setTimeout(() => {
        router.push('/');
    }, 500);
};

  useEffect(() => {
    startVerification();
  }, [window.ComplyCube]);


  const texts = {
    en: {
      verificationTitle: 'Verification in ComplyCube',
      verificationDescription: 'By clicking on the "Start Verification" button, you will be redirected to ComplyCube, the company responsible for identity and KYC verification. Gafpri does not collect any selfies or document photos; ComplyCube handles the entire verification process securely and independently.',
      startVerification: 'Start Verification',
      successTitle: 'Verification Sent',
      successSubtitle: 'Your verification has been successfully submitted. Please continue the process in the Gafpri app.',
    },
    es: {
      verificationTitle: 'Verificación en ComplyCube',
      verificationDescription: 'Al hacer clic en el botón "Iniciar Verificación", será redirigido a ComplyCube, la empresa responsable de la verificación de identidad y KYC. Gafpri no recopila selfies ni fotos de documentos; ComplyCube maneja todo el proceso de verificación de manera segura e independiente.',
      startVerification: 'Iniciar Verificación',
      successTitle: 'Verificación Enviada',
      successSubtitle: 'Tu verificación se ha enviado con éxito. Por favor, continúa el proceso en la app de Gafpri.',
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
          onClick={() => returnInit()}
        >
          <IoArrowBack style={{ fontSize: 18 }} />
        </button>
        <h3>{texts[language].verificationTitle}</h3>
      </div>

      <div id="complycube-mount" style={{ marginBottom: "20px" }}></div>

      {isLoading && <Loading />}
    </div>
  );
}
