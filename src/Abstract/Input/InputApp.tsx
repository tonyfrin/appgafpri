import React from 'react';
import { css } from '@emotion/css';

const inputAppStyles = css`
  width: 90%;
  margin: 0 auto;
  border: 2px solid #eaeaea;
  padding: 8px 19px;
  text-align: left;
  outline: 0;
  border-radius: 15px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 1em;
  font-size: 1em;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;

  ::placeholder {
    color: #a0a0a0;
    font-size: 1em;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
`;



export const InputApp = (props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  return (
    <>
        <input className={inputAppStyles}  {...props}/>
     </>
  );
}
