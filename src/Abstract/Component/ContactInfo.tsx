import React from "react";
import { Layout } from '../../Abstract/Component/Layout';
import { Contact } from "../Privacy/Contact";
import { LayoutWhite } from "./LayoutWhite";


export const ContactInfo = (): JSX.Element => {
    
      return (
            <LayoutWhite>
                <>
                   <Contact />
                </>
            </LayoutWhite>
    )
}