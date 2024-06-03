import React from 'react';
import { WalletAccount } from '../../../Abstract/Component/WalletAccount';
import { useRouter } from 'next/router';

export default function Categoria() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <WalletAccount id={id}/>
    </>
  );
}
