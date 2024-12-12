import { useState, useEffect, FC, CSSProperties } from 'react';
import Image from "next/image";

interface CarouselProps {
  images: string[];
  interval?: number;
}

const ImageCarousel: FC<CarouselProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // Limpiar el intervalo al desmontar
  }, [images.length, interval]);

  return (
    <div style={styles.carouselContainer}>
      <div
        style={{
          ...styles.slideContainer,
          transform: `translateX(-${currentIndex * 100}%)`, // Desplaza las imágenes
        }}
      >
        {images.map((image, index) => (
          <div key={index} style={styles.slide}>
            <Image
              src={image}
              height={300}
              width={300}
              alt={`Slide ${index + 1}`}
              style={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
    margin: '0 auto',
  },
  slideContainer: {
    display: 'flex',
    transition: 'transform 0.5s ease',
    width: '100%',
  },
  slide: {
    flex: '0 0 100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    gap: '10px',
  },
  indicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default ImageCarousel;

