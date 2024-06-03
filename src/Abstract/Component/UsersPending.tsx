import React from 'react';
import { UsersListPending } from '../Users/UsersListPending';
import { LayoutAdmin } from './LayoutAdmin';

export function UsersPending() {

  return (
    <>
      <LayoutAdmin>
        <>
          <div>

            <UsersListPending />
          
          </div>
        </>
      </LayoutAdmin>
    </>
  );
}