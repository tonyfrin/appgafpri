import React from 'react';
import { Products } from '../../Abstract/Component/Products';
import { useRouter } from 'next/router';

export default function Categoria() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Products id={id} />
    </>
  );
}
