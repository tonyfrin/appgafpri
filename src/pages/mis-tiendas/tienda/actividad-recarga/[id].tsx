import React from 'react';
import { useRouter } from 'next/router';
import { WalletRechargeListMySite } from '../../../../Abstract/Component/WalletRechargeListMySite';

export default function AddEmployees() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <WalletRechargeListMySite id={id} />
    </>
  );
}