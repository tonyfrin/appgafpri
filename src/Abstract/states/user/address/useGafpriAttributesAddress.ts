import { useEffect, useState } from 'react';
import { validationInput, generalValidationButtonNext } from '../../../helpers';
import { AddressAttributesReturn } from './useGafpriApiAddress';
import { UseGafpriApiUserReturn } from '../useGafpriApiUser';

type AddressItem = {
  id: string;
  name: string;
  fullAddress: string;
  address: AddressAttributesReturn;
}

type state = {
    id: string;
    type: string;
    address1: string;
    address1Valid: boolean;
    address2: string;
    address2Valid: boolean;
    city: string;
    cityValid: boolean;
    state: string;
    postCode: string;
    country: string;
    latitude: string;
    longitude: string;
    entityId: string;
    cityOptions: { value: string; label: string }[];
    address: AddressAttributesReturn | null;
    entityOptions: { value: string; label: string }[];
    addressList: AddressItem[];
}

type actions = {
    resetInfo: () => void;
    setId: (value: string) => void;
    setEntityId: (value: string) => void;
    validationAddress1: (value: string) => boolean;
    validationAddress2: (value: string) => boolean;
    validationCity: (value: string) => boolean;
    validationButton: () => boolean;
    changeAddress1: (value: string) => void;
    changeAddress2: (value: string) => void;
    changeCity: (value: string) => void;
    changeCurrentLocation: () => void;
    setAddress: (value: AddressAttributesReturn | null) => void;
    setEntityOptions: (value: { value: string; label: string }[]) => void;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
}

export type UseGafpriAttributesAddressReturn = {
    states: state;
    actions: actions;
}

export type UseGafpriAttributesAddressProps = {
  apiUser: UseGafpriApiUserReturn;
}



export const useGafpriAttributesAddress = ({
  apiUser
}: UseGafpriAttributesAddressProps ): UseGafpriAttributesAddressReturn => {
    const [id, setId] = useState<string>('');
    const type = 'shipping';
    const [address1, setAddress1] = useState<string>('');
    const [address1Valid, setAddress1Valid] = useState<boolean>(false);
    const [address2, setAddress2] = useState<string>('');
    const [address2Valid, setAddress2Valid] = useState<boolean>(true);
    const [city, setCity] = useState<string>('Maracaibo');
    const [cityValid, setCityValid] = useState<boolean>(true);
    const cityOptions = [
        { value: 'Maracaibo', label: 'Maracaibo' },
        { value: 'San Francisco', label: 'San Francisco' },
    ]
    const stateCountry = 'VE-V';
    const postCode = '';
    const country = 'VE';
    const [entityId, setEntityId] = useState<string>('');
    const [entityOptions, setEntityOptions] = useState<{ value: string; label: string }[]>([]);
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [address, setAddress] = useState<AddressAttributesReturn | null>(null);
    const [addressList, setAddressList] = useState<AddressItem[]>([]);


    const user = apiUser.states.user;

    const resetInfo = (): void => {
        setId('');
        setAddress1('');
        setAddress1Valid(false);
        setAddress2('');
        setAddress2Valid(true);
        setCity('Maracaibo');
        setCityValid(true);
        setEntityId(''); 
        setLatitude('');
        setLongitude('');  
    }

    const validationAddress1 = (value: string) => {
        const valid = validationInput(
            value,
            /^[a-zA-Z0-9#]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_#'()\-.,\s]+$/,
            true,
          );
          if (valid !== address1Valid) {
            setAddress1Valid(valid);
          }
          return valid;
    }

    const validationAddress2 = (value: string) => {
        const valid = validationInput(
            value,
            /^[a-zA-Z0-9#]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_#'()\-.,\s]+$/,
            false,
          );
          if (valid !== address2Valid) {
            setAddress2Valid(valid);
          }
          return valid;
    }

    const validationCity = (value: string) => {
        const valid = value.length > 1;
        if (valid !== cityValid) {
            setCityValid(valid);
        }
        return valid;
    }

    const validationButton = () => {
        return generalValidationButtonNext({
          validations: [
            address1Valid,
            address2Valid,
            cityValid,
          ],
          inputId: 'add-update-address-button',
        });
      }

    const changeAddress1 = (value: string) => {
        setAddress1(value);
        validationAddress1(value);
    }

    const changeAddress2 = (value: string) => {
        setAddress2(value);
        validationAddress2(value);
    }

    const changeCity = (value: string) => {
        setCity(value);
        validationCity(value);
    }

    const changeCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
                setLatitude(latitude.toString());
                setLongitude(longitude.toString());
            },
            error => {
              console.error('Error obteniendo la ubicación:', error);
            }
          );
        } else {
          console.error('Geolocalización no soportada por el navegador.');
        }
    };

    useEffect(() => {
      if(user){
        const items: AddressItem[] = [];
        const options: { value: string; label: string }[] = [];
        user.entity.map((entity) => {
          options.push({value: entity.id, label: entity.lastName ? `${entity.name} ${entity.lastName}` : entity.name});
          entity.address.map((item) => {
            items.push({
              id: item.id,
              name: entity.lastName ? `${entity.name} ${entity.lastName}` : entity.name,
              fullAddress: `${item.address1}, ${item.city}`,
              address: item,
            });
            return null;
          });
          return null;
        });
        setAddressList(items);
        setEntityOptions(options);
      }
    }, [user])

    const states = {
        id,
        type,
        address1,
        address1Valid,
        address2,
        address2Valid,
        city,
        cityValid,
        state: stateCountry,
        postCode,
        country,
        latitude,
        longitude,
        entityId,
        cityOptions,
        address,
        entityOptions,
        addressList
    }

    const actions = {
        resetInfo,
        setId,
        setEntityId,
        validationAddress1,
        validationAddress2,
        validationCity,
        validationButton,
        changeAddress1,
        changeAddress2,
        changeCity,
        changeCurrentLocation,
        setAddress,
        setEntityOptions,
        setLatitude,
        setLongitude,
    }

    return {
        states,
        actions,
    }
}