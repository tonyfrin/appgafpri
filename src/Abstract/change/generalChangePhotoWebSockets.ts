// import axios, { AxiosRequestConfig } from 'axios';
import { ChangeEvent } from 'react';
import { getMimeTypeByExtension } from '../helpers';
import { v4 as uuidv4 } from 'uuid';

export type GeneralChangePhotoProps = {
  e: ChangeEvent<HTMLInputElement>;
  setSubmitting: (valueSubmitting: boolean) => void;
  from: string;
  setPhoto: (valuePhoto: string) => void;
  changeError: (valueError: string[]) => void;
};

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function textToArrayBuffer(text: string): ArrayBuffer {
  const binaryString = window.atob(text.split(',')[1]);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export const generalChangePhotoWebSockets = async ({
  e,
  setSubmitting,
  changeError,
  setPhoto,
  from,
}: GeneralChangePhotoProps): Promise<void> => {
    const ws = new WebSocket('wss://lit-cove-22933-f97494e6b56f.herokuapp.com');
    const clientId = uuidv4();
    const TIMEOUT_DURATION = 10000; // 10 segundos

  let timeoutId: NodeJS.Timeout;

  const handleTimeout = () => {
    changeError(['La solicitud ha tardado demasiado. Por favor, intenta de nuevo.']);
    setSubmitting(false);
    ws.close();
  };
  
  ws.onopen = () => {
    console.log('Connected to the WebSocket server');
  };

    ws.onmessage = (event) => {
      clearTimeout(timeoutId);
      const receivedData = JSON.parse(event.data);
      
      if (receivedData.model === 'image' && receivedData.action === 'create' && receivedData.from === from) {
        if(receivedData.success){
          setPhoto(receivedData.data);
          setSubmitting(false);
        } else {
          changeError([receivedData.data]);
          setSubmitting(false);
        }
      } 
    }; 
  
  ws.onerror = (error) => {
    clearTimeout(timeoutId); // Limpiar el timeout si hay un error
    console.error('WebSocket error:', error);
    changeError(['Ocurrió un error con la conexión. Por favor, intenta de nuevo.']);
    setSubmitting(false);
  };

  ws.onclose = () => {
    console.log('Disconnected from the WebSocket server');
    clearTimeout(timeoutId);
  };
  
  const newFile = e.target.files && e.target.files[0];

  if (!newFile) return;

  const mimeType = getMimeTypeByExtension(newFile.name);
  if (!mimeType) {
    changeError([
      'El archivo no es una imagen válida. Asegúrate de subir un archivo JPG, JPEG o PNG.',
    ]);
    return;
  }

  setSubmitting(true);

  try {
    if(clientId !== ''){
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        if (fileReader.readyState === 2 && fileReader.result !== null)

            if(event.target !== null){

              let arrayBuffer: ArrayBuffer;
              if (typeof fileReader.result === 'string') {
                arrayBuffer = textToArrayBuffer(fileReader.result);
              } else {
                arrayBuffer = fileReader.result as ArrayBuffer;
              }

              // Convertir el ArrayBuffer a una cadena base64
              const base64String = arrayBufferToBase64(arrayBuffer);

              const data = {
                clientId,
                fileArrayBuffer: base64String,
                from
              };


              // Convertir el objeto a JSON y enviarlo a través del WebSocket
              
              ws.send(JSON.stringify(data));
              timeoutId = setTimeout(handleTimeout, TIMEOUT_DURATION);
            } else{
              changeError(['Error al leer el archivo']);
              setSubmitting(false);
            }
      };
      fileReader.readAsArrayBuffer(newFile);
    }

  } catch (newErrorValue: any) {
    changeError([`${newErrorValue.message}`]);
    setSubmitting(false);
  }
};
