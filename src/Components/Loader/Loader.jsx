// Loader.jsx

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-slate-800 bg-opacity-50 z-50">
            <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            <p className="mt-4 text-base text-gray-700">Wait for a while...</p>
        </div>
    );
};

export default Loader;
