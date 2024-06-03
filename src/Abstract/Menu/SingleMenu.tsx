import React from "react";
import { css } from '@emotion/css';
import Link from 'next/link';

type MenuItems = {
    title: string;
    link: string;
}

const singleMenuContainer = css`
    grid-column-gap: 2rem;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    display: flex;

    @media (max-width: 991px) {
        display: none;
    }
`;

const singleMenuContentLink = css`
    opacity: 1;
    border-radius: 6px;
    justify-content: center;
    align-self: stretch;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    text-decoration: none;
    transition: background-color .325s;
    display: flex;
    max-width: 100%;
    text-decoration: none;

    &:hover {
        background-color: #06b2e8; 
        color: #fff; 
    }
`;

const singleMenuContentTitle = css`
    justify-content: flex-start;
    align-items: center;
    bottom: 2px;
    text-decoration: none;
    padding: .5rem;
    font-weight: 700;
    color: #FFF;
`

export type SingleMenuProps = {
    items: MenuItems[];
}

export const SingleMenu = ({
    items
}: SingleMenuProps): JSX.Element => {
    return (
        <div className={singleMenuContainer}>
            {items.length > 0 && items.map((item, index) => (
                <Link key={`menu-${index}`} href={item.link} className={singleMenuContentLink}>
                <div className={singleMenuContentTitle}>
                    {item.title}
                </div>
            </Link>
            ))}
        </div>
    );
}