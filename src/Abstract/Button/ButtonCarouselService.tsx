import { css, cx } from '@emotion/css';
import Link from "next/link";

interface ButtonCarouselProps {
    link: string;
    src: string;
    title: string;
    className?: string;
}

const GsContainerButton3 = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const GsNameButton3 = css`
    color: black;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 700;
    text-align: center;
    position: absolute;
    padding-top: 35vh;
    left: 10px;

    @media (max-width: 900px) {
        padding-top: 50vh;
        font-size: 1.5rem;
    }

    @media (max-width: 790px) {
        padding-top: 45vh;
    }

    @media (max-width: 520px) {
        padding-top: 58vh;
    }

    @media (max-width: 415px) {
        padding-top: 45vh;
    }

    @media (max-width: 360px) {
        padding-top: 40vh;
        font-size: 1.1rem;
    }

    
`;

const buttonCarouselStyles = css`
    font-size: 16px;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    user-select: none;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #ffffff;
    cursor: pointer;

    @media (max-width: 991px) {
        display: contents;
        flex: 1 0 50%; 
        max-width: 50%;
        box-sizing: border-box;
    }

`;

const containerImage = (src: string) => css`
    background-image: url(${src});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    height: 40vh;
    width: 25vh;
    background-position: center;
    position: relative;
    margin-left: 45px;

    @media (max-width: 991px) {
        margin-bottom: 1rem;
    }

    @media (max-width: 900px) {
        height: 55vh;
        width: 45vh;
    }

    @media (max-width: 790px) {
        height: 50vh;
        width: 35vh;
    }

    @media (max-width: 600px) {
        margin-left: 0px;
    }

    @media (max-width: 520px) {
        height: 65vh;
        width: 45vh;    
    }

    @media (max-width: 470px) {
        width: 40vh;
    }

    @media (max-width: 415px) {
        height: 50vh;
        width: 35vh;
    }

    @media (max-width: 360px) {
        height: 46vh;
        width: 32vh;
    }
`

export const ButtonCarouselService: React.FC<ButtonCarouselProps> = ({ link, src, title }) => {
    return (
        <Link href={link} className={cx(buttonCarouselStyles)}>
            <div className={GsContainerButton3}>
                <div className={cx(containerImage(src))}>
                    <span className={GsNameButton3} >{title}</span>
                </div>
            </div>
        </Link>
    );
};
