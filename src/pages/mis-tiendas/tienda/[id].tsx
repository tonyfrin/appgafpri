import React from 'react';
import { useRouter } from 'next/router';
import { InitMySite } from '../../../Abstract/Component/InitMySite';

export default function Categoria() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <InitMySite id={id} />
    </>
  );
}
