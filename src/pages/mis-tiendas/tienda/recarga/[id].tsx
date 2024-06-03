import React from 'react';
import { useRouter } from 'next/router';
import { RechargeMySites } from '../../../../Abstract/Wallet/RechargeMySites';

export default function AddEmployees() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <RechargeMySites id={id} />
    </>
  );
}