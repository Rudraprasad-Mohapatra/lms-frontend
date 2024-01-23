function CarouselSlide({ image, title, description, slideNumber, totalSlides }) {
    const slideId = `slide${slideNumber}`;

    return (
        <div id={slideId} className="carousel-item relative w-full flex">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img src={image} className="w-40 rounded-full border-2 border-gray-400" />
                <p className="text-xl text-gray-200 text-center">{description}</p>
                <h3 className="text-2xl font-semibold">{title}</h3>
                <div className="absolute flex gap-x-4 justify-between transform -translate-y-1/2 sm:top-[30%] md:top-1/2 w-full px-2">
                    <a href={`#slide${slideNumber === 1?totalSlides:slideNumber - 1}`} className="btn btn-circle">❮</a>
                    <a href={`#slide${slideNumber === totalSlides?1:slideNumber + 1}`} className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
}

export default CarouselSlide;
