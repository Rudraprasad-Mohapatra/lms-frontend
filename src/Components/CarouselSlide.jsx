function CarouselSlide({ slideRef, featuredImageObject, handleOnPrevClick, handleOnNextClick }) {
    return (
        <div className="carousel-item relative w-full flex">
            <div ref={slideRef} className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img src={featuredImageObject.image} className="w-40 rounded-full border-2 border-gray-400" />
                <p className="text-xl text-gray-200 text-center">{featuredImageObject.description}</p>
                <h3 className="text-2xl font-semibold">{featuredImageObject.title}</h3>
                <div className="absolute flex gap-x-4 justify-between transform -translate-y-1/2 sm:top-[30%] md:top-1/2 w-full px-2">
                    <button onClick={handleOnPrevClick} className="btn btn-circle">❮</button>
                    <button onClick={handleOnNextClick} className="btn btn-circle">❯</button>
                </div>
            </div>
        </div>
    );
}

export default CarouselSlide;
