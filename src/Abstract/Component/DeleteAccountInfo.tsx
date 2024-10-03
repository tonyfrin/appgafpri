import React from "react";
import { Layout } from '../../Abstract/Component/Layout';
import { DeleteAccount } from "../Privacy/DeleteAccount";


export const DeleteAccountInfo = (): JSX.Element => {
    
      return (
            <Layout>
                <>
                   <DeleteAccount />
                </>
            </Layout>
    )
}