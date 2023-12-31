import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { forgotPassword } from "../Redux/Slice/AuthSlice";

function ForgotPassword() {
    const [passwordResetData, setPasswordResetData] = useState({
        email: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setPasswordResetData({
            ...passwordResetData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(forgotPassword(passwordResetData));
        console.log(`Forgot password for email: ${passwordResetData?.email}`)
        setPasswordResetData({ "email": "" });

        // Use setTimeout with a promise to delay the redirection
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={handleSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Forgot Password</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="bg-transparent px-2 py-1 border rounded-md"
                            onChange={handleUserInput}
                            value={passwordResetData.email} />

                        <button type="submit" className="mt-2 w-full bg-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 font-semibold text-lg cursor-pointer">
                            Send
                        </button>

                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ForgotPassword;