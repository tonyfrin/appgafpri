import React from 'react';
import { css } from '@emotion/css';

interface GeneralAttribute {
  name: string;
  value: string;
}

export interface AttributeTableProps {
  data: GeneralAttribute[];
}

const tableContainer = css`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Poppins', sans-serif;
  font-size: 0.6em;
`;

const tableRow = css`
  &:nth-child(even) {
    background-color: #ececec;
  }
`;

const tableCell = css`
  border: 1px solid #ddd;
  padding: 8px;
  width: 50%;
`;

export const AttributeTable: React.FC<AttributeTableProps> = ({
  data,
}) => {
  return (
    <table className={tableContainer}>
      <tbody>
        {data.map((attribute, index) => (
          <tr className={tableRow} key={index}>
            <td className={tableCell}><strong>{attribute.name}</strong></td>
            <td className={tableCell}>{attribute.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
