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

export function PaymentPage() {
  const hasInitialized = useRef(false);


  // Maneja si estamos esperando a que se inicialice el SDK
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const paymentsRef = useRef<any>(null);
  const cardRef = useRef<any>(null);

  useEffect(() => {
    // Evita la doble ejecución en modo Strict de React
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeSquare = async () => {
      setIsLoading(true); // Comenzamos a cargar

      if (typeof window === "undefined" || !window.Square) {
        console.error("El SDK de Square no se ha cargado");
        setIsLoading(false);
        return;
      }

      // Reemplaza con tus variables de entorno o tus credenciales
      const appId = "sandbox-sq0idb-SG2xArqz1aaIDJO9UZFYTQ";
      const locationId = "LYCQJT8958G9Z";

      if (!appId || !locationId) {
        console.error("Faltan credenciales de Square");
        setIsLoading(false);
        return;
      }

      try {
        paymentsRef.current = window.Square.payments(appId, locationId);
        paymentsRef.current.setLocale('en-US');

        // 2. Crea la instancia card y guárdala en la ref
        cardRef.current = await paymentsRef.current.card();

        // 3. Adjunta la tarjeta
        requestAnimationFrame(async () => {
          await cardRef.current.attach("#card-container");
          setIsLoading(false);
        });

       

        // Escucha el submit del formulario
        const form = document.querySelector<HTMLFormElement>("#card-payment");
        form?.addEventListener("submit", async (event) => {
          event.preventDefault();
          try {
            setIsLoading(true);
            const result = await cardRef.current.tokenize();
        
            if (result.status === "OK") {
              const dataToSend = JSON.stringify({
                status: result.status,
                token: result.token,
                details: result.details,
              });
        
              console.log(dataToSend);
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(dataToSend);
              }
            } else if (result.status === "Invalid") {
              // En este caso, la tarjeta no está completa o hay datos inválidos.
              // No mostramos el modal de "error genérico"
              // sino que dejamos que Square muestre sus mensajes de error en el formulario (si corresponde).
              console.error("Error de validación:", result);
            } else {
              // Cualquier otro estado lo tomamos como un error "real"
              console.error("Error de tokenización:", result);
              setIsModal(true);
            }
          } catch (err) {
            console.error("Error al tokenizar:", err);
            setIsModal(true);
          } finally {
            setIsLoading(false);
          }
        });
        
      } catch (error) {
        console.error("Error al inicializar Square:", error);
        setIsLoading(false);
      }
    };

    initializeSquare();

    // Limpieza al desmontar
    return () => {
      const cardContainer = document.getElementById("card-container");
      if (cardContainer) {
        cardContainer.innerHTML = "";
      }
    };
  }, []);

 
  

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
            window.ReactNativeWebView.postMessage("closeWebView");
          }
        }}
        >
          <IoArrowBack style={{fontSize: 18}}/>
        </button>
        <h3>Add card</h3>

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
                      window.ReactNativeWebView.postMessage("closeWebView");
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
