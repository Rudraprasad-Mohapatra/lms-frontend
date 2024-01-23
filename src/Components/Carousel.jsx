import { useEffect, useState } from 'react';

import celebrities from '../Constants/CelebrityData.js';
import CarouselSlide from './CarouselSlide';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const totalSlides = celebrities.length;

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextSlide = currentSlide % totalSlides + 1;
            setCurrentSlide(nextSlide);
            console.log("nextSlide value is ", nextSlide);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentSlide, totalSlides]);

    return (
        <div className="carousel w-3/4 md:w-1/2 my-16 m-auto">
            {celebrities && celebrities.map((celebrity, index) => (
                <CarouselSlide
                    {...celebrity}
                    key={index + 1}
                    slideNumber={index + 1}
                    totalSlides={totalSlides}
                />
            ))}
        </div>
    );
}

export default Carousel;
