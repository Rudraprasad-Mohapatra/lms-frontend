import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs"
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../../Components/Loader/Loader.jsx";
import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slice/CourseSlice.js";
import { getPaymentRecord } from "../../Redux/Slice/RazorPaySlice.js";
import { getStatsData } from "../../Redux/Slice/StatSlice.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);

    const { allPayments, finalMonths, monthlySalesRecord } = useSelector((state) => state.razorpay);

    const [loading, setLoading] = useState(false);

    const userData = {
        labels: ["Registered User", "Enrolled User"],
        fontColor: "white",
        datasets: [
            {
                label: "User Details",
                data: [allUsersCount, subscribedCount],
                backgroundColor: ["yellow", "green"],
                borderWidth: 1,
                borderColor: ["yellow", "green"],

            }
        ]
    }

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                data: [10, 20, 30, 40, 50, 60, 70],
                backgroundColor: ["rgb(255, 99, 132)"],
                borderColor: ["White"],
                borderWidth: 2
            }
        ]
    }

    const myCourses = useSelector((state) => state?.course?.courseData);

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete the course ? ")) {
            setLoading(true);
            const res = await dispatch(deleteCourse(id));
            console.log(res);
            if (res?.payload?.success) {
                // The state might not have updated immediately after dispatching deleteCourse
                // Wait for a short time before dispatching getAllCourses
                setTimeout(async () => {
                    await dispatch(getAllCourses());
                    // Now, you can log the updated myCourses
                    console.log(myCourses);
                    setLoading(false);
                }, 3000); // Adjust the timeout duration as needed
            }
        }
    }
    useEffect(() => {
        (
            async () => {
                await dispatch(getAllCourses());
                await dispatch(getStatsData());
                await dispatch(getPaymentRecord());
            }
        )()
    }, [])

    return (
        <HomeLayout>

            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                {/* Heading */}
                <h1 className="text-center sm:text-3xl md:text-5xl font-semibold text-yellow-500 sm:m-6">
                    Admin Dashboard
                </h1>

                <div className="flex flex-wrap gap-5 m-auto mx-10">
                    {/* 1st child */}
                    <div className="flex flex-1 flex-col items-center gap-10 p-5 shadow-lg shadow-slate-700 rounded-md">
                        <div className="w-80 h-80 transform transition-transform duration-500 hover:scale-105">
                            <Pie data={userData} />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-wrap items-center justify-center p-5 gap-5 rounded-md shadow-md border-zinc-900 border-2 transform transition-transform duration-500 hover:scale-105">
                                <div className="flex flex-col items-center">
                                    <p className="font-semi-bold flex flex-wrap items-center gap-2 justify-center">
                                        <span>Registered</span>
                                        <span>Users</span>
                                    </p>
                                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl" />
                            </div>

                            <div className="flex flex-wrap items-center justify-center p-5 gap-5 rounded-md shadow-md border-zinc-900 border-2 transform transition-transform duration-500 hover:scale-105">
                                <div className="flex flex-col items-center">
                                    <p className="font-semi-bold flex flex-wrap gap-2 items-center justify-center">
                                        <span>Subscribed</span>
                                        <span>Users</span>
                                    </p>
                                    <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl" />
                            </div>
                        </div>
                    </div>

                    {/* 2nd child*/}

                    <div className="flex flex-1 flex-col items-center gap-10 p-5 shadow-lg shadow-slate-700 rounded-md">
                        <div className="w-80 h-80 relative transform transition-transform duration-500 hover:scale-105">
                            <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-wrap items-center justify-center p-5 gap-5 rounded-md shadow-md border-zinc-900 border-2  transform transition-transform duration-500 hover:scale-105">
                                <div className="flex flex-col items-center">
                                    <p className="font-semi-bold flex flex-wrap items-center gap-2 justify-center">
                                        <span>Subscription</span>
                                        <span>Count</span>
                                    </p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count || 30}</h3>
                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl" />
                            </div>

                            <div className="flex flex-wrap items-center justify-center p-5 gap-5 rounded-md shadow-md border-zinc-900 border-2 transform transition-transform duration-500 hover:scale-105">
                                <div className="flex flex-col items-center">
                                    <p className="font-semi-bold flex flex-wrap gap-2 items-center justify-center">
                                        <span>Total</span>
                                        <span>Revenue</span>
                                    </p>
                                    <h3 className="text-4xl font-bold">{(allPayments?.count || 33) * 499}</h3>
                                </div>
                                <GiMoneyStack className="text-green-500 text-5xl" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* 3rd child */}
                <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-center text-3xl font-semibold">
                            Course Overview
                        </h1>

                        <button className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 rounded-md py-2 px-4 font-semibold text-lg" onClick={() => { navigate("/course/create") }}>
                            Create Course
                        </button>
                    </div>
                </div>
                {/* 3rd child */}
                <div className="overflow-x-scroll mx-[10%] w-[80%]">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-center">S No</th>
                                <th className="text-center">Course Title</th>
                                <th className="text-center">Course category</th>
                                <th className="text-center">Instructor</th>
                                <th className="text-center">Total lectures</th>
                                <th className="text-center">Description</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCourses?.map((course, idx) => {
                                return (
                                    <tr key={course?._id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <textarea readOnly
                                                value={course?.title}
                                                className="w-40 h-auto bg-transparent resize-none"
                                            ></textarea>
                                        </td>
                                        <td className="text-center">{course?.category}</td>
                                        <td className="text-center">{course?.createdBy}</td>
                                        <td className="text-center">{course.numbersOfLectures}</td>
                                        <td className="max-w-2xl overflow-y-auto text-ellipsis whitespace-nowrap">
                                            <textarea
                                                value={course?.description}
                                                readOnly
                                                className="w-80 h-auto bg-transparent resize-none ">
                                            </textarea>
                                        </td>
                                        <td className="text-center w-40 flex flex-wrap items-center justify-center gap-4">
                                            <button className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() => navigate("/course/displaylectures", { state: { ...course } })}>
                                                <BsCollectionPlayFill />
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() => {
                                                    onCourseDelete(course?._id);
                                                }}>
                                                <BsTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
            {loading && <Loader />} {/* Show loader when loading state is true */}
        </HomeLayout>
    )
}

export default AdminDashboard;