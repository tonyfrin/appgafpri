import React from 'react';
import { useRouter } from 'next/router';
import { Categories } from '../../Abstract/Component/Categories';

export default function Categoria() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Categories id={id}/>
    </>
  );
}
