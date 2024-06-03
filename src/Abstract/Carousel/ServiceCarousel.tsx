import React from "react";
import { Carousel } from "./Carousel";
import { cx, css } from '@emotion/css';


const carousel1ContentStyles = css`
    margin: 30px auto;
    padding: 0;
    display: flex;
    z-index: 1;
`;

type ServiceCarouselProps = {
    children: React.ReactNode;
}


export const ServiceCarousel = ({children}: ServiceCarouselProps) => {

    return (
            <div className={cx(carousel1ContentStyles)}>
                <Carousel>
                    {React.Children.map(children, (child, index) => {
                        if (!React.isValidElement(child)) {
                            return null; 
                        }
                        return React.cloneElement(child);
                    })}
                </Carousel>
            </div>
    );
}