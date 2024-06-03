import React from 'react';
import { css } from '@emotion/css';
import { ButtonFooterApp } from '../Button/ButtonFooterApp';
import { IconType } from 'react-icons';

const containerStyle = css`
    background-color: #ececec;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 997;
    border-top: 1px solid #e1e1e1
`

const contentStyle = css`
    display: flex;
    justify-content: space-evenly;
`

export type Items = {
    icon: IconType;
    title: string;
    href: string;
}

export type MenuFooterAppProps = {
    items: Items[];
}

export const MenuFooterApp = ({ items }: MenuFooterAppProps) => {
 

    return (
        <div className={containerStyle}>
            <div className={contentStyle}>
                <ButtonFooterApp items={items}/>
            </div>
        </div>
    ) 
}