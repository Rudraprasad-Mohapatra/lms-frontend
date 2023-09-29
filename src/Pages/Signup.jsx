import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slice/AuthSlice";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(event) {
        event.preventDefault();
        // Getting the image
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            // console.log("This is", fileReader);
            fileReader.addEventListener("load", function () {
                // console.log("This is", this.result);
                setPreviewImage(this.result)
            });
        }
    }

    async function createNewAccount(event) {
        console.log("clicked");
        event.preventDefault();
        if (!signupData.email ||
            !signupData.password ||
            !signupData.fullName ||
            !signupData.avatar
        ) {
            toast.error("Please fill all the details");
            return;
        }

        // Checking name field length
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters.");
            return;
        }
        // Checking valid email id 
        if (!signupData.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            toast.error("Invalid email");
            return;
        }

        // Checking password validation
        if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
            toast.error("Password should be 6 to 16 character long with at least a number, and at least a special character.");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);
        
        const response = await dispatch(createAccount(formData));
        console.log(response);
        if(response?.payload?.success)
            navigate("/");


        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        })
        setPreviewImage("");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={createNewAccount} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                    <label htmlFor="image_upload" className="cursor-pointer">
                        {previewImage ? (
                            <img src={previewImage} className="w-24 h-24 rounded-full m-auto" />
                        ) : <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />}
                    </label>
                    <input
                        className="hidden"
                        type="file"
                        id="image_upload"
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={getImage}
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Full Name</label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your fullname"
                            className="bg-transparent px-2 py-1 border rounded-md"
                            onChange={handleUserInput}
                            value={signupData.fullName} />
                    </div>
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
                            value={signupData.email} />
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="font-semibold">Password</label>
                            <input
                                type="password"
                                required
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className="bg-transparent px-2 py-1 border rounded-md"
                                onChange={handleUserInput}
                                value={signupData.password} />
                        </div>

                        <button type="submit" className="mt-2 w-full bg-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 font-semibold text-lg cursor-pointer">
                            Create account
                        </button>

                        <p className="text-center">
                            Already have an account ?<Link to="/login" className="link text-accent cursor-pointer">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;