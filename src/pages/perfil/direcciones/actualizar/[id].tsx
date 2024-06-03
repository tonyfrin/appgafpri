import React from 'react';
import { useRouter } from 'next/router';
import { UpdateAddress } from '../../../../Abstract/Component/UpdateAddress';

export default function Actualizar() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <UpdateAddress id={id} />
    </>
  );
}
