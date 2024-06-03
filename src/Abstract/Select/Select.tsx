import React, { ChangeEvent } from 'react';
import { css } from '@emotion/css';

// Estilos
const selectStyles = css`
  width: 90%;
  margin: 0 auto;
  border: none;
  padding: 0px 10px;
  text-align: left;
  outline: 0;
  background-color: #fff0;
  box-sizing: border-box;
  font-size: 0.8em;
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
export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select className={selectStyles} value={value} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

