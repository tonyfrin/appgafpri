import React from 'react';
import { css } from '@emotion/css';
import { Loading, LoadingProps } from '../Loading';
import { ButtonAppMobile } from '../Button/ButtonAppMobile';
import NextImage from 'next/image';

export type PhotoFormProps = {
  formId: string;
  photo: string | null;
  imageFormConatinerStyle?: string;
  changePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitting: boolean;
  loadingContainerStyle?: string;
  loadingProps?: LoadingProps;
  imageStyle?: string;
  changeError: (error: string[]) => void;
  setSubmitting: (submitting: boolean) => void;
};

export type PhotoFormPropsExtended = {
  imageFormConatinerStyle?: string;
  loadingContainerStyle?: string;
  loadingProps?: LoadingProps;
  imageStyle?: string;
};

const defaultImageFormConatinerStyle = css`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  margin-top: 2em; 
`;

const defaultLoadingContainerStyle = css`
  transition: all 1s ease 0s;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: auto;
`;

const defaultImageStyle = css`
  transition: all 1s ease 0s;
  width: 30%;
  height: auto;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  border: 1px solid #ebebeb;
  margin: auto;
  border-radius: 10px;
`;

export const PhotoForm = ({
  formId,
  photo,
  imageFormConatinerStyle = defaultImageFormConatinerStyle,
  changePhoto,
  submitting,
  loadingContainerStyle = defaultLoadingContainerStyle,
  loadingProps,
  imageStyle = defaultImageStyle,
  changeError,
  setSubmitting,
}: PhotoFormProps) => {
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    if (photo) {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        setSubmitting(false);
      };
      img.onerror = () => {
        changeError([`Error al cargar la imagen: ${photo}`]);
        setSubmitting(true);
      };
    }
  }, [photo]); // eslint-disable-line

  return (
    <>
      <form
        className={css(imageFormConatinerStyle)}
        onSubmit={handleSubmit}
        id={formId}
      >
        <>
          <input
            type="file"
            id="file-input"
            ref={fileInputRef}
            hidden
            accept="image/*"
            capture="user"
            onChange={changePhoto}
          />
          {!photo ?
            <ButtonAppMobile 
              title="Subir Foto"
              containerProps={{
                onClick: handleButtonClick,
              }}
            /> :
            <>
            <ButtonAppMobile 
              title="Cambiar Foto"
              containerProps={{
                onClick: handleButtonClick,
              }}
              containerStyles={{
                width: 'fit-content',
                borderRadius: '5px',

              }}
              contentStyles={{
                fontSize: '0.6em',
                padding: '0.5em',
              }}
            />
            </>
          }
        </>
        {submitting ? (
          <div className={css(loadingContainerStyle)}>
            <Loading {...loadingProps} />
          </div>
        ) : (
          photo && (
            <NextImage className={css(imageStyle)} src={photo} alt="Category" width={100} height={100}/>
          )
        )}
      </form>
    </>
  );
};
