import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slice/LectureSlice";

function AddLecture() {
    const courseDetails = useLocation().state;
    console.log("I am coursedetails", courseDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    })

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        console.log("I am ", video, " and I am ", source)
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandtory");
            return;
        }
        console.log("I am userInput", userInput);
        const response = await dispatch(addCourseLecture(userInput));
        if (response?.payload?.success) {
            navigate(-1);
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })
        }
    }

    useEffect(() => {
        if (!courseDetails) navigate("/courses")
    }, [])

    return (
        <HomeLayout>
            <div className="h-[90vh] text-white flex  flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                            className="absolute left-2 text-xl text-green-500"
                            onClick={() => navigate(-1)}>
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add new lecture
                        </h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter the title of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border-2 border-stone-900 rounded-lg active:border-stone-950"
                            value={userInput.title}
                        />
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Enter the dscription of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border-2 border-stone-900 rounded-lg min-h-[50px] max-h-[300px] overflow-y-scroll active:border-stone-950"
                            value={userInput.description}
                        />
                        {
                            userInput.videoSrc ? (
                                <video
                                    src={userInput.videoSrc}
                                    className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                    controls
                                    disablePictureInPicture
                                    muted
                                    controlsList="nodownload nofullScreen"
                                    autoPlay
                                    loop
                                >

                                </video>
                            ) : (
                                <div className="h-48 border-2 flex items-center justify-center cursor-pointer">
                                    <label htmlFor="lecture"
                                        className="font-semibold text-xl cursor-pointer">
                                        Choose your video
                                    </label>
                                    <input
                                        type="file" name="lecture" id="lecture"
                                        className="hidden"
                                        onChange={handleVideo}
                                        accept="video/mp4 video/x-mp4 video/*" />
                                </div>
                            )
                        }
                        <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                            Add new lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AddLecture;