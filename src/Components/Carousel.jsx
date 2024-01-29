import "./Carousel.css"

import { useEffect, useRef, useState } from 'react';

import celebrities from '../Constants/CelebrityData.js';
import CarouselSlide from './CarouselSlide';

const featuredImagesObject = celebrities;
const productsLength = featuredImagesObject.length;
let count = 0;
let slideInterval;

function Carousel() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef();

    useEffect(() => {
        startSlider();
        slideRef.current.addEventListener("animationend", removeAnimation);

        return () => {
            clearInterval(slideInterval);
        }
    }, []);

    function removeAnimation() {
        slideRef.current.classList.remove("fade-anim");
    }

    function handleOnPrevClick() {
        clearInterval(slideInterval);
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
        startSlider();
    }

    function handleOnNextClick() {
        clearInterval(slideInterval);
        count = (count + 1) % productsLength;
        setCurrentIndex(count);
        slideRef.current?.classList?.add("fade-anim");
        startSlider();
    }

    function startSlider() {
        slideInterval = setInterval(() => {
            handleOnNextClick()
        }, 3000);
    }

    return (
        <div className="carousel w-3/4 md:w-1/2 my-16 m-auto">
            <CarouselSlide slideRef={slideRef} featuredImageObject={featuredImagesObject[currentIndex]} handleOnNextClick={handleOnNextClick} handleOnPrevClick={handleOnPrevClick} />
        </div>
    );
}

export default Carousel;
