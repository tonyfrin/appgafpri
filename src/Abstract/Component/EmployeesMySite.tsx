import React from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { MySiteEmployees } from '../MySites/MySiteEmployees';

export function EmployeesMySite({id}: {id: string | string[] | undefined}) {
  
  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

            <MySiteEmployees id={id} />
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}