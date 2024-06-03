'use client'
import React from "react";
import { useSwipeable } from "react-swipeable";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill, BsFillCircleFill } from "react-icons/bs";
import {cx, css} from '@emotion/css';

const carouselContainerStyles = css`
position: relative; 
width: 100%; /* Ajusta el ancho del contenedor del carrusel según sea necesario */
margin: 0 auto;
overflow: hidden;
`;

const innerStyles = css`
position: relative; 
margin: 0;
padding: 0;
z-index: 1;
transition: transform 0.5s;
width: 100%;
display: flex;
align-items: stretch; 
flex-wrap: nowrap;

@media (max-width: 991px) {
    flex-wrap: wrap;
    transition: none;
}

    @media (max-width: 900px) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr)); /* Crea columnas dinámicas con un ancho mínimo del 100% del contenedor */
        gap: 10px;
    }
`;

const buttonArrowStyles = css`
    padding: 0px 20px;
`;


const carouselPointsStyles = (active: boolean) => css`
    opacity: ${active ? '1' : '0.2'};
    display: block;
    cursor: pointer;
    color: #ccc;
    border-radius: 999px;
    background: #ccc;
    width: 12px;
    height: 12px;
    margin: 7px;

    @media (max-width: 991px) {
        display: none;
    }
`;

const carouselArrowStyles = css`
    font-size: 50px;
    position: absolute;
    display: block;
    border: none;
    top: calc(50% - 50px);
    cursor: pointer;
    line-height: 30px;
    text-align: center;
    background: none;
    color: #07b2e7;;
    z-index: 999;
    left: 0px;

    @media (max-width: 991px) {
        display: none;
    }
`;

const carouselArrowStylesRigth = css`
    font-size: 50px;
    position: absolute;
    display: block;
    border: none;
    top: calc(50% - 50px);
    cursor: pointer;
    line-height: 30px;
    text-align: center;
    background: none;
    color: #07b2e7;;
    z-index: 999;
    right: 0px;

    @media (max-width: 991px) {
        display: none;
    }
`;

const carouselIndicatorPointsContainerStyles = css`
    user-select: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    padding: 0;
`;

const carouselIndicatorArowContainerStyles = css`
    user-select: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0;
`;

const carouselItemStyles = css`
    width: 25%;
    height: auto;
    flex-grow: 0; 
    flex-shrink: 0;

    @media (max-width: 991px) {
        width: 50%;
    }

    @media (max-width: 900px) {
        width: 100%;
    }
`;

interface CarouselItemProps {
    children: React.ReactNode;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
    return (
        <div className={cx(carouselItemStyles)}>
            {children}
        </div>
    );
};

export const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [paused, setPaused] = React.useState(true);

    const updateIndex = (newIndex: number) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(children) -4;
        } else if (newIndex >= (React.Children.count(children) -3)) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };

    const Points: React.FC = () => {
        const numPages = (React.Children.count(children) -3);
        return (
            <>
                {Array.from({ length: numPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            updateIndex(index);
                        }}
                    >
                        <BsFillCircleFill className={cx(carouselPointsStyles(index === activeIndex))} />
                    </button>
                ))}
            </>
        );
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) {
                updateIndex(activeIndex + 1);
            }
        }, 1500);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [activeIndex, paused]); // eslint-disable-line

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    return (
        <div 
        {...handlers}
            className={cx(carouselContainerStyles)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(true)}
        >
            <div className={cx(innerStyles)} style={{ transform: `translateX(-${activeIndex * 25}%)` }}>
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child as React.ReactElement<CarouselItemProps>);
                })}
            </div>
            <div className={cx(carouselIndicatorArowContainerStyles)}>
                <button
                    onClick={() => {
                        updateIndex(activeIndex - 1);
                    }}
                >
                    <BsFillArrowLeftCircleFill className={cx(carouselArrowStyles)} />
                </button>

                <button
                    className={buttonArrowStyles}
                    onClick={() => {
                        updateIndex(activeIndex + 1);
                    }}
                >
                    <BsFillArrowRightCircleFill className={cx(carouselArrowStylesRigth)} />
                </button>
            </div>
            <div className={cx(carouselIndicatorPointsContainerStyles)}>
                

                <Points />

                
            </div>
        </div>
    );
};

