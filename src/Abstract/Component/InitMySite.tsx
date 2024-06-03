import React from 'react';
import { LayoutAppProfile } from './LayoutAppProfile';
import { MySiteMenu } from '../MySites/MySiteMenu';

export function InitMySite({id}: {id: string | string[] | undefined}) {
  
  return (
    <>
      <LayoutAppProfile>
        <>
          <div>

            <MySiteMenu id={id} />
          
          </div>
        </>
      </LayoutAppProfile>
    </>
  );
}