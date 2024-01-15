import { useEffect } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";

import HomePageImage from "../assets/Images/homePageMainImage.png"
import HomeLayout from "../Layouts/HomeLayout";
function HomePage() {
    useEffect(() => {
        new Typed('#typed-text', {
            strings: ['Empower your mind with our budget-friendly courses led by top-notch educators.', 'Quality courses, expert instructors, unbeatable prices.', 'Affordable learning, exceptional faculty, boundless possibilities.'],
            typeSpeed: 30,
            backSpeed: 30,
            loop: true,
            cursorChar: '',
            contentType: 'text',
        });
    },[]);

    return (
        <HomeLayout>
            <div className="pt-10 text-white flex flex-col lg:flex-row items-center justify-center lg:gap-x-0 gap-y-10 mx-0 min-h-[90vh] max-h-fit">
                <div className="w-1/2 space-y-6 space-x-2 px-4">
                    <h1 className="text-5xl font-semibold text-center">
                        Find out best
                        <span className="text-yellow-500 font-bold"> Online Courses</span>
                    </h1>
                    <p id="typed-text" className="text-xl text-gray-200 text-center h-auto w-auto inline-block">
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link to="/courses">
                            <button className="border bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out">Explore courses</button>
                        </Link>
                        <Link to="/contact">
                            <button className="border px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out">Contact Us</button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-center m-4 lg:m-0">
                    <img src={HomePageImage} alt="homepageimage" />
                </div>
            </div>
        </HomeLayout>
    );
}

export default HomePage;