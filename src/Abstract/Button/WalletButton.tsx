import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

export type WalletButtonProps = {
    href: string;
    Icon: IconType;
    title: string;
};

export const WalletButton = ({
    href,
    Icon,
    title
}: WalletButtonProps) => {
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
                backgroundColor: '#0ab1e6',
                color: '#fff',
                borderRadius: '10px',
                boxShadow: '0 1px 6px 0 #20212447',
                cursor: 'pointer',
                padding: '0.8em'
            }}>
                <div
                    style={{
                        margin: 'auto',
                    }}
                >
                    <Icon 
                        style={{
                            fontSize: '2em',
                            padding: '0',
                            margin: '0'
                        }}
                    />
                </div>
                <div
                    style={{
                        margin: 'auto',
                    }}
                >
                    <span
                        style={{
                            fontSize: '0.7em',
                            fontWeight: '600',
                            fontFamily: '"Poppins", sans-serif',
                            padding: '0',
                            margin: '0'
                        }}
                    >{title}</span>
                </div>
            </Link>

        </div>
    )
}