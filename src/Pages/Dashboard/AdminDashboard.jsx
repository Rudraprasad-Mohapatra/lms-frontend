import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        dataSets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: ["rgb(255, 99, 132)"],
                borderColor: ["White"],
                borderWidth: 2
            }
        ]
    }

    const myCourses = useSelector((state) => state?.course?.courseData);

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete the course ? ")) {
            const res = await dispatch(deleteCourse(id));
            if (res?.payload?.success) {
                await dispatch(getAllCourses);
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
                <h1 className="text-center text-5xl font-semibold text-yellow-500">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-2xl shadow-slate-700 rounded-md">
                        <div className="w-80 h-80">
                            <Pie data={userData} />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-wrap items-center justify-center p-5 gap-5 rounded-md shadow-md border-zinc-900 border-2">
                                <div className="flex flex-col items-center">
                                    <p className="font-semi-bold flex flex-wrap items-center gap-2 justify-center">
                                        <span>Registered</span>
                                        <span>Users</span>
                                    </p>
                                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl" />
                            </div>

                            <div className="flex flex-wrap items-center justify-center p-5 gap-5 rounded-md shadow-md border-zinc-900 border-2">
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
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashboard;