import React from 'react';
import { useRouter } from 'next/router';
import { EmployeesMySiteList } from '../../../../../Abstract/Component/EmployeesMySiteList';

export default function Categoria() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <EmployeesMySiteList id={id} />
    </>
  );
}