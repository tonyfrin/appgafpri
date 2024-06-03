import React from 'react';
import { useRouter } from 'next/router';
import { WalletRechargeDetails } from '../../../Abstract/Component/WalletRechargeDetails';

export default function Categoria() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <WalletRechargeDetails id={id}/>
    </>
  );
}