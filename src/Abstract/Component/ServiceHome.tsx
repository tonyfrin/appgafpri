import React from "react";
import { Layout } from '../../Abstract/Component/Layout';
import { VideoSection } from "../../Abstract/Section/VideoSection";
import { ServiceSection } from "../../Abstract/Section/ServiceSection";
import { StoreSection } from "../../Abstract/Section/StoreSection";
import { WalletSection } from "../../Abstract/Section/WalletSection";
import { DeliverySection } from "../../Abstract/Section/DeliverySection";
import { CreditSection } from "../../Abstract/Section/CreditSection";


export const ServiceHome = (): JSX.Element => {
    
      return (
            <Layout>
                <>
                   <VideoSection/>
                   <ServiceSection/>
                   <StoreSection/>
                   <WalletSection />
                   <DeliverySection/>
                   <CreditSection />
                </>
            </Layout>
    )
}