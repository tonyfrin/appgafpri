import React from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { MySiteEmployeesList } from '../MySites/MySiteEmployeesList';

export function EmployeesMySiteList({id}: {id: string | string[] | undefined}) {
  
  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

            <MySiteEmployeesList id={id} />
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}