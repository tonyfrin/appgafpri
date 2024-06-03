import React from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import { IconType } from "react-icons";
import { useTheme } from '../context/ThemeContext';

type Items = {
    title: string;
    href: string;
    icon: IconType;
}

const linkStyle = css`
    width: 25%;
    display: contents;
`

const iconButtonStyle = css`
    padding: 10px;
`

const inconStyle = css`
    color: #848589;
    font-size: 25px;
`

const iconTitleStyle = css`
    color: #848589;
    font-size: 10px;
    font-family: 'Poppins', sans-serif;
`

type ButtonFooterAppProps = {
    items: Items[];
}

export const ButtonFooterApp = ({
    items
}: ButtonFooterAppProps) => {
    const { actions } = useTheme();

    return (
       
        <>
             { items.length > 0 && items.map((item, index) => (
                <Link href={item.href} className={linkStyle} key={`button-fotter-${index}`}>
                    <button className={iconButtonStyle}
                        onClick={actions.globalResetInfo}
                    >
                        <div>
                            {item.icon && <item.icon className={inconStyle}/>}
                        </div>
                        <div>
                            <span className={iconTitleStyle}>{item.title}</span>
                        </div>
                    </button>
                </Link>
            ))}
        </>
        
    )
}