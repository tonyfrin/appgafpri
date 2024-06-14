import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

export type HomeWalletButtonProps = {
    href: string;
    Icon: IconType;
    title: string;
};

export const HomeWalletButton = ({
    href,
    Icon,
    title
}: HomeWalletButtonProps) => {
    return (
        <div
            style={{
                width: '33%',
                display: 'flex',
                flexDirection: 'column',
                margin: 'auto'
            }}
        >
            <Link href={href} style={{ 
                textDecoration: 'none',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                fontFamily: '"Poppins", sans-serif',
            }}>
                <div
                    style={{
                        margin: 'auto',
                        backgroundColor: '#0ab1e6',
                        color: '#fff',
                        borderRadius: '100%',
                        boxShadow: '0 1px 6px 0 #20212447',
                        cursor: 'pointer',
                        padding: '0.6em',
                        display: 'flex'
                    }}
                >
                    <Icon 
                        style={{
                            fontSize: '1.4em',
                            padding: '0',
                            margin: '0'
                        }}
                    />
                </div>
                <div
                    style={{
                        margin: 'auto',
                        display: 'flex',
                        marginTop: '5px'
                    }}
                >
                    <span
                        style={{
                            fontSize: '0.6em',
                            fontWeight: '500',
                            fontFamily: '"Poppins", sans-serif',
                            padding: '0',
                            margin: '0',
                            color: '#FFF'
                        }}
                    >{title}</span>
                </div>
            </Link>

        </div>
    )
}