import React from "react";
import { Layout } from '../../Abstract/Component/Layout';
import { DeleteAccount } from "../Privacy/DeleteAccount";
import { LayoutWhite } from "./LayoutWhite";


export const DeleteAccountInfo = (): JSX.Element => {
    
      return (
            <LayoutWhite>
                <>
                   <DeleteAccount />
                </>
            </LayoutWhite>
    )
}