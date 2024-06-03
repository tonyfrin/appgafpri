import React from 'react';
import { AddressUpdate } from '../Address/AddressUpdate';
import { LayoutAppProfile } from './LayoutAppProfile';

export function UpdateAddress({id}: {id: string | string[] | undefined}) {

  return (
    <>
      <LayoutAppProfile>
        <>
             
                <div>
                
                    <AddressUpdate id={id} />

                </div>
             
        </>
      </LayoutAppProfile>
    </>
  );
}