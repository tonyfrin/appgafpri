import React from 'react';
import { useRouter } from 'next/router';
import { EmployeesMySite } from '../../../../../Abstract/Component/EmployeesMySite';

export default function AddEmployees() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <EmployeesMySite id={id} />
    </>
  );
}