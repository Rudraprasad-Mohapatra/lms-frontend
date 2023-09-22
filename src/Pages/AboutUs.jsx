import aboutMainImage from "../assets/Images/aboutMainImage.png"
import CarouselSlide from "../Components/CarouselSlide";
import celebrities from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";
function AboutUs() {

    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the affordable and quality education to the world.
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower in the growth and wellness of mnkind.
                        </p>
                    </section>

                    <div className="w-1/2">
                        <img id="test" src={aboutMainImage}
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                            }} className="drop-shadow-2xl" alt="about main image" />
                    </div>
                </div>
                <div className="carousel w-1/2 my-16 m-auto">
                    {celebrities && celebrities.map(celebrity =>  <CarouselSlide 
                    {...celebrity} 
                    key={celebrity.slideNumber} totalSlides={celebrities.length}/>)}
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;