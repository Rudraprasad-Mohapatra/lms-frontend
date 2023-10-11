import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Coursecard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout"
import { getAllCourses } from "../../Redux/Slice/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state.course);

    async function loadCourses() {
        const res = await dispatch(getAllCourses());
        console.log("res is", res);
    }

    useEffect(() => {
        loadCourses();
    }, [])

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-20 px-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the course made by
                <span className="font-bold text-yellow-500">Industry Experts</span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((element) => {
                        // console.log(element);
                        return <Coursecard key={element._id} data={element} />
                    })}
                </div>

            </div>
        </HomeLayout>
    );

}

export default CourseList;