import React from 'react';
import { css } from '@emotion/css';

const progressBarContainerStyles = css`
    margin: 20px auto;
    width: 90%;
    height: 5px;
    background-color: #f0f0f0;
    border-radius: 5px;
    overflow: hidden;
    transition: width 0.5s ease-in-out;
`

const progressBarContentStyles = (percent: number) => css`
        width: ${percent}%;
        height: 100%;
        background-color: #314577;
        transition: width 0.5s ease-in-out;
`

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div  className={progressBarContainerStyles}>
      <div className={progressBarContentStyles(percentage)}
      />
    </div>
  );
};
