import React from 'react';
import { User } from '../Users/User';
import { LayoutAdmin } from './LayoutAdmin';

export function UserDetails({id}: {id: string | string[] | undefined}) {

  return (
    <>
      <LayoutAdmin>
        <>
          <div>

            <User id={id} />
          
          </div>
        </>
      </LayoutAdmin>
    </>
  );
}