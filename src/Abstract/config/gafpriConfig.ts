export type SiteOptions = {
  id: number;
  CURRENCY_FORMAT: {
    miles: '.' | ',';
    decimal: '.' | ',';
  };
  CURRENCY_LOCATION: 'left' | 'right';
  CURRENCY_SYMBOL: string;
  DECIMAL_NUMBERS: number;
  MAIN_STORAGE: number;
  name: string;
  documentIndex: string;
  documentNumber: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  email: string;
  phone: string;
  taxes: boolean;
  host: string;
  footerBudget: string[];
  budgetValidation: string;
  currencyId: number;
  footerOrderPending: string[];
  categoryIdsMainHome: string[];
};

const CURRENCY_SYMBOL = '$';
const CURRENCY_LOCATION: 'left' | 'right' = 'left';
const DECIMAL_NUMBERS = 2;
const THOUSANDS_SEPARATOR: '.' | ',' = ',';
const DECIMAL_SEPARATOR: '.' | ',' = '.';
const CURRENCY_FORMAT = {
  miles: THOUSANDS_SEPARATOR,
  decimal: DECIMAL_SEPARATOR
};
const MAIN_STORAGE = 2;

export const siteOptions: SiteOptions = {
    id: 1,
    CURRENCY_FORMAT,
    CURRENCY_LOCATION,
    CURRENCY_SYMBOL,
    DECIMAL_NUMBERS,
    MAIN_STORAGE,
    name: 'Gafpri Corp',
    documentIndex: 'J',
    documentNumber: '18987287',
    address1: 'Av 15 delicias con calle 72',
    address2: '',
    city: 'Maracaibo',
    state: 'VE-V',
    postCode: '',
    country: 'VE',
    email: 'info@gafpri.com',
    phone: '(424) 123-4567',
    taxes: false,
    host: 'www.gafpri.com',
    footerBudget: [
      'Gafpri la marca preferida por los venezolanos',
    ],
    budgetValidation: '15 días',
    currencyId: 1,
    footerOrderPending: [
      'Gafpri la marca preferida por los venezolanos',
    ],
    categoryIdsMainHome: ['1']
};
