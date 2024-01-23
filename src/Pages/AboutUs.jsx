import { useEffect } from "react";
import Typed from "typed.js";

import aboutMainImage from "../assets/Images/aboutMainImage.png"
import Carousel from "../Components/Carousel";
// import CarouselSlide from "../Components/CarouselSlide";
import celebrities from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";
function AboutUs() {
    useEffect(() => {
        new Typed('#typed-about', {
            strings: ['Affordable and quality education', 'Quality courses', 'Expert instructors', 'Unbeatable prices.', 'Affordable learning', 'Exceptional faculty', 'Boundless possibilities.'],
            typeSpeed: 30,
            backSpeed: 30,
            loop: true,
            cursorChar: '',
            contentType: 'text',
        });
    }, []);
    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex flex-col lg:flex-row items-center gap-5 lg:mx-10">
                    <section className="w-full">
                        <p id="typed-about" className="text-3xl md:text-5xl text-yellow-500 font-semibold py-5 w-full inline-block  h-16 md:h-20">
                        </p>
                        <p className="text-xl text-gray-200 text-justify pr-5">
                            Our goal is to provide the affordable and quality education to the world.
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower in the growth and wellness of mnkind.
                        </p>
                    </section>

                    <div className="w-3/4">
                        <img id="test" src={aboutMainImage}
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                            }} className="drop-shadow-2xl" alt="about main image" />
                    </div>
                </div>

                {/* <div className="carousel w-3/4 md:w-1/2 my-16 m-auto">
                    {celebrities && celebrities.map(celebrity => <CarouselSlide
                        {...celebrity}
                        key={celebrity.slideNumber} totalSlides={celebrities.length} />)}
                </div> */}
                
                <Carousel celebrities={celebrities}/>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;


{/* <div className="carousel w-3/4 md:w-1/2 my-16 m-auto">
    {celebrities && celebrities.map((celebrity, index) => (
        <CarouselSlide
            {...celebrity} 
            key={celebrity.slideNumber}
            slideNumber={index + 1}
            totalSlides={totalSlides}
            onNavigate={handleNavigate}
        />
    ))}
</div> */}