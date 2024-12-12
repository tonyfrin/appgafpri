import React from "react";
import { Layout } from '../../Abstract/Component/Layout';
import { VideoSection } from "../../Abstract/Section/VideoSection";
import { BudgetSection } from "../Section/BudgetSection";
import FloatingWhatsAppButton from "../Notification/FloatingWhatsAppButton";


export const ServiceHome = (): JSX.Element => {

    
    
      return (
            <Layout>
                <div
                    style={{
                        paddingBottom: '200px'
                    }}
                >
                    <VideoSection/>
                    <BudgetSection />
                   <FloatingWhatsAppButton />
                </div>
            </Layout>
    )
}