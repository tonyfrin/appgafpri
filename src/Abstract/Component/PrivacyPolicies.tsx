import React from "react";
import { Layout } from '../../Abstract/Component/Layout';
import { PrivacyPolicy } from "../Privacy/PrivacyPolicy";


export const PrivacyPolicies = (): JSX.Element => {
    
      return (
            <Layout>
                <>
                   <PrivacyPolicy />
                </>
            </Layout>
    )
}