import React from 'react';
import { css, cx } from '@emotion/css';

type ButtonAppMobileConatinerStylesProps = {
  backgroundColor?: string;
  color?: string;
  fontFamiliy?: string;
  width?: string;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
  cursor?: string;
  fontSize?: string;
  padding?: string;
  custom?: string;
  fontFamily?: string;
}

const buttonAppMobileConatinerStyles = (style: ButtonAppMobileConatinerStylesProps) => css`
    font-family: ${style.fontFamiliy || 'Poppins, sans-serif'};
    background-color: ${style.backgroundColor || '#314577'};
    color: ${style.color || '#fff'};
    width: ${style.width || '78%'};
    margin: ${style.margin || '2% auto'};
    border-radius: ${style.borderRadius || '12px'};
    box-shadow: ${style.boxShadow || '0 1px 6px 0 #20212447'};
    cursor: ${style.cursor || 'pointer'};
    font-size: ${style.fontSize || '1.1em'};
    padding: ${style.padding || '0.7em'};
    font-family: ${style.fontFamily || 'Poppins, sans-serif'};
    font-weight: 700;
    text-align: center;
    ${style.custom || ''}
`

const inputStyles = css`
  display: none;
`;

export const InputPhotoCamera: React.FC<{
  title: string, 
  setPhotoData: (url: string) => void, 
  containerStyles?: ButtonAppMobileConatinerStylesProps;
}> = ({
  title, 
  setPhotoData,
  containerStyles = {}
}) => {

  const handleCapturePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPhotoData(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input className={inputStyles} type="file" id="upload-photo" accept="image/*" capture="environment" onChange={handleCapturePhoto} />
      <label className={cx(buttonAppMobileConatinerStyles(containerStyles))} htmlFor="upload-photo">{title}</label>
    </>
  );
};