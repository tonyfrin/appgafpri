import React, { ChangeEvent } from 'react';
import { css } from '@emotion/css';

// Estilos
const selectStyles = css`
  width: 90%;
  margin: 0 auto;
  border: 2px solid #eaeaea;
  text-align: left;
  outline: 0;
  border-radius: 15px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 1em;
  font-size: 1em;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
`;

// Tipado de las props
interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

// Componente Select
export const SelectApp: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select className={selectStyles} defaultValue={value} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

