import React from 'react';
import { css } from '@emotion/css';

const buttonInfoEditContainerStyles = css`
    border-radius: 15px;
    background-color: #ebebeb;
    width: 90%;
    margin: 20px auto;   
`

const buttonInfoEditContentStyles = css`
    padding: 1em;
    display: flex;
    justify-content: space-between;
`

const infoEditContentStyles = css`
    font-size: 1em;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: #a0a0a0;
    width: 75%;
    overflow: hidden;
`

const infoEditLinkStyles = css`
    font-size: 1em;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: #0ab1e6;
    width: 25%;
`


type ButtonEditInfoProps = {
    content: string;
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & { buttonTitle: string };
    generalOnclick?: () => void;
}



export const ButtonEditInfo = ({
    content,
    buttonProps,
    generalOnclick
}: ButtonEditInfoProps) => {
  return (
    <>
        <div className={buttonInfoEditContainerStyles}>
            <div className={buttonInfoEditContentStyles}
                onClick={generalOnclick}
            >
                <span className={infoEditContentStyles}>
                    {content}
                </span>
                {buttonProps && 
                    <button className={infoEditLinkStyles} {...buttonProps}>
                        {buttonProps?.buttonTitle}
                    </button>
                }
            </div>
        </div>
     </>
  );
}
