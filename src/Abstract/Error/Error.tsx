import React, { FC } from 'react';
import { css } from '@emotion/css';

export interface ErrorProps {
  error: string[] | null;
  mainContainerStyle?: string;
  textStyle?: string;
}

const defaultMainContainerStyle = css`
  width: 90%;
  margin: 1em auto;
`;

const defaultTextStyle = css`
  background-color: #c12429;
  border-radius: 10px;
  text-align: center;
  padding: 0.8em;
  color: white;
  font-weight: 400;
  margin: 1px;
  font-size: 0.8em;
  margin-bottom: 1em;
`;

export const Error: FC<ErrorProps> = ({
  error,
  mainContainerStyle = defaultMainContainerStyle,
  textStyle = defaultTextStyle,
}) => (
  <>
    {error && (
      <div className={css(mainContainerStyle)}>
        {error.map((item, index) => (
          <p className={css(textStyle)} key={`error-${index}`}>
            {item}
          </p>
        ))}
      </div>
    )}
  </>
);
