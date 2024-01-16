import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slice/LectureSlice";

function DisplayLectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(() => {
        console.log("I am state", state);
        if (!state) navigate("/courses")

        dispatch(getCourseLectures(state._id));

    }, [])

    async function onLectureDelete(courseId, lectureId) {
        console.log("I am coureId", courseId);
        console.log("I am lectureId", lectureId);
        await dispatch(deleteCourseLecture({ courseId, lectureId }));
        await dispatch(getCourseLectures(courseId));
    }

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-5 text-white mx-[5%]">
                <div className="text-center text-2xl pt-40px font-semibold text-yellow-500">
                    Course Name : {state.title}
                </div>
                {/* {lectures && lectures.length > 0 && <div className="flex justify-center gap-10 w-full"> */}
                {<div className="flex justify-center items-center gap-10 w-full flex-col lg:flex-row">
                    {/* left section for playing video and displaying course details to admin */}
                    <div className="space-y-10 w-[80vw] h-auto p-2 rounded-lg shadow-[0_0_10px_black] custom-scrollbar">
                        <h1 className="p-0 m-0">
                            <span className="text-yellow-500">
                                Title :&nbsp;
                            </span>
                            {lectures && (lectures[currentVideo]?.title || "This is title.")}
                        </h1>
                        <video
                            key={lectures && lectures[currentVideo]?.lecture?.secure_url}
                            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                            autoPlay
                            loop
                        >
                        </video>
                        <div>

                            <p>
                                <span className="text-yellow-500">
                                    Description :
                                </span>
                                {lectures && (lectures[currentVideo]?.description || "This is description")}
                            </p>
                        </div>
                    </div>

                    {/* right section for displaying list of lectures */}
                    <ul className="w-[80vw] lg:w-[40vw] h-auto max-h-[50vh] md:max-h-[70vh] custom-scrollbar overflow-y-scroll p-2 rounded-lg shadow-[0_0_10px_black]">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                            <p>Lectures List</p>
                            {role === "ADMIN" && (
                                <button
                                    onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                    Add new lecture
                                </button>
                            )}
                        </li>
                        {lectures && lectures.length === 0 && (
                            <li className="font-semibold text-xl text-yellow-500 w-full flex items-center justify-center">
                                <p>OOPS !! No Lectures Found 🥺</p>
                            </li>
                        )}

                        {lectures &&
                            lectures.map((lecture, idx) => {
                                return (
                                    <li className="space-y-2" key={lecture._id}>
                                        <hr />
                                        <p className="cursor-pointer"
                                            onClick={() => {
                                                setCurrentVideo(idx)
                                            }}>
                                            <span>
                                                {" "} Lecture {idx + 1} : {" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {role === "ADMIN" && (
                                            <button
                                                onClick={() => onLectureDelete(state?._id, idx)} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm">
                                                Delete lecture
                                            </button>
                                        )}
                                        <hr />
                                    </li>
                                )
                            })}
                    </ul>
                </div>}
            </div>
        </HomeLayout>
    );
}

export default DisplayLectures;