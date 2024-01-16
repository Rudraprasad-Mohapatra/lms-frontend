import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {

    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 py-10 relative">
                    <div className="group space-y-5 p-2 shadow-2xl">
                        <img
                            className="w-full h-64 object-fit rounded-tl-lg rounded-tr-lg group-hover:scale-105 transition-all ease-in-out duration-300"
                            src={state?.thumbnail?.secure_url} 
                            alt="thumbnail" />
                        <div className="space-y-4">
                            <div className="flex flex-col items-start justify-between text-xl">
                                <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-5 text-center">
                                    {state.title}
                                </h1>
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total Lectures : {" "}
                                    </span>
                                    {state?.numbersOfLectures}
                                </p>
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>
                            </div>
                            {(role == "ADMIN" || data?.subscription?.status === "active") ? (
                                <button
                                    onClick={() => navigate("/course/displaylectures", { state: { ...state } })}
                                    className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Watch Lectures
                                </button>
                            ) : (
                                <button onClick={() => navigate("/checkout")} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Subscribe
                                </button>
                            )

                            }
                        </div>
                    </div>

                    <div className="space-y-2 text-xl">
                        <p className="text-yellow-500 text-center">Course Description</p>
                        <p className="line-clamp-3 max-w-prose pl-2">{state.description}</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDescription;