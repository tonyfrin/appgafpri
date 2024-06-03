import moment from 'moment-timezone';
import { API_URL } from '../constants';


export const addClass = (element: string, className: string): void => {
    const input = document.getElementById(element);
  
    if (input && input.classList && !input.classList.contains(className)) {
      input.classList.add(className);
    }
  };
  
  export const removeClass = (element: string, className: string): void => {
    const input = document.getElementById(element);
  
    if (input && input.classList && input.classList.contains(className)) {
      input.classList.remove(className);
    }
};

export function validationHidden(value: string, validate: RegExp): boolean {
    return validate.test(value);
}


export const validationInput = (
    value: string,
    match: RegExp,
    required = false
): boolean => {
    const valid = validationHidden(value, match);
  
    if (required && (!valid || !value)) {
      return false;
    }
  
    if (value && valid) {
      return true;
    }
  
    if (!required && !value) {
      return true;
    }

    return false;
};



export type GeneralValidationButtonNextProps = {
  validations: boolean[];
  inputId: string;
};

export const generalValidationButtonNext = ({
  validations,
  inputId,
}: GeneralValidationButtonNextProps): boolean => {
  const isAllValid = validations.every((validation) => validation);

  if (isAllValid) {
    removeClass(inputId, 'gs-disabled');
  } else {
    addClass(inputId, 'gs-disabled');
  }

  return isAllValid;
};

export interface InitToken {
  token?: string | undefined;
}

interface FetchOptions<T = unknown> {
  initMethod: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  initApi?: string;
  initRoute: string;
  initToken?: InitToken;
  initCredentials?: T;
  functionFetching?: () => void;
  functionSuccess?: (data: T) => void;
  functionError?: (data: T) => void;
}

export async function gafpriFetch<T = unknown>({
  initMethod,
  initApi = API_URL,
  initRoute,
  initToken,
  initCredentials,
  functionFetching,
  functionSuccess,
  functionError,
}: FetchOptions<T>): Promise<any> {

  if (functionFetching !== undefined) {
    functionFetching();
  }

  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (initToken !== undefined) {
    headers = {
      ...headers,
      Authorization: `Bearer ${initToken.token}`,
    };
  }

  const options: RequestInit = {
    method: initMethod,
    headers: headers,
    body: JSON.stringify(initCredentials),
  };

  const resp = await fetch(`${initApi}${initRoute}`, options)
    .then((response) => response.json())
    .then((data) => {
      
      if (data.success) {
        if (functionSuccess !== undefined) {
          functionSuccess(data);
        }
      } else if (functionError !== undefined) {
        functionError(data);
      }
      return data;
    })
    .catch((error) => {
      if (functionError !== undefined) {
        functionError(error);
      }
      return error;
  });
  return resp;
}

export interface FormatOptions {
  miles: ',' | '.';
  decimal: ',' | '.';
}

export const decimalFormatPriceConverter = (
  str: string | number,
  dig: number,
  currencySymbol: string,
  currencyLocation: 'left' | 'right',
  formatOptions: FormatOptions = { miles: ',', decimal: '.' }
): string => {
  let data = 0;

  if (typeof str === 'number') {
    data = str;
  } else if (typeof str === 'string') {
    const sanitizedStr = str
      .replace(new RegExp(`\\${formatOptions.miles}`, 'g'), '')
      .replace(formatOptions.decimal, '.');
    const check = parseFloat(sanitizedStr);

    if (!Number.isNaN(check)) {
      data = check;
    }
  }

  // Asegurarse de que haya siempre la cantidad deseada de decimales
  const fixedDecimal = data.toFixed(dig);

  // Formatear con separadores de miles y decimales
  const parts = fixedDecimal.split('.');
  const formattedNumber =
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, formatOptions.miles) +
    (parts[1] ? formatOptions.decimal + parts[1] : ''); // Agregado manejo de casos sin decimales

  if (currencyLocation === 'left') {
    return `${currencySymbol} ${formattedNumber}`;
  }

  return `${formattedNumber} ${currencySymbol}`;
};

export function formatPhoneNumber(phoneNumber: string): string {
  // Eliminar cualquier caracter que no sea un dígito
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // Verificar si el número tiene un cero inicial y eliminarlo
  let formatted = cleaned;
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    formatted = cleaned.substring(1);
  }

  // Aplicar el formato deseado
  formatted = formatted.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');

  return formatted;
}

export const formatDate = (date: string): string => {
  const newDate = new Date(date);
  // Formatear la fecha
  const format = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return format.format(newDate);
};

export function getMimeTypeByExtension(filename: string): string | null {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    default:
      return null;
  }
}

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const connectToWebSocket = (websocketUrl: string): WebSocket => {
  const websocket = new WebSocket(websocketUrl);

  websocket.onopen = () => {
    console.log('Conexión establecida con el servidor WebSocket');
  };

  websocket.onerror = (error) => {
    console.error('Error al conectar al servidor WebSocket:', error);
  };

  return websocket;
};

export const ucfirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDateVzla = (date: string): string => {
  const dateMoment = moment(date);

  const dateVenezuela = dateMoment.tz('America/Caracas');
 
  const dateFormat = dateVenezuela.format('DD/MM/YYYY h:mm a');

  return dateFormat;
}

export function formatPhoneNumberVzla(phoneNumber: string): string | null {
  // Asegurarse de que el número tiene exactamente 12 dígitos
  if (phoneNumber.length !== 12) {
      return null;
  }

  // Extraer las partes del número de teléfono
  const countryCode = phoneNumber.slice(0, 2);
  const areaCode = phoneNumber.slice(2, 5);
  const firstPart = phoneNumber.slice(5, 8);
  const secondPart = phoneNumber.slice(8, 12);

  // Formatear el número de teléfono
  return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
}