import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout"
import { getUserData, updateProfile } from "../../Redux/Slice/AuthSlice";

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id)
    })

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if(!data.fullName || !data.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if(data.fullName.length < 5) {
            toast.error("Name cannot be of less than 5 characters");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);


        await dispatch(updateProfile(formData));

        await dispatch(getUserData());

        navigate("/user/profile");

    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                onSubmit={onFormSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xlfont-semibold">Edit Profile</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {
                            data.previewImage ? (
                                <img src={data.previewImage} alt="Preview Image" className="w-28 h-28 rounded-full m-auto" />
                            ) : (
                                <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                            )
                        }
                    </label>
                    <input 
                    className="hidden"
                    type="file"
                    onChange={handleImageUpload}
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .png, .jpeg"
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                            <input 
                            type="text" 
                            name="fullName" 
                            id="fullName"
                            placeholder="Enter your name"
                            className="bg-transparent px-2 py-1 border"
                            value={data.fullName}
                            onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">Update Profile</button>
                    <Link to="/user/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2"><AiOutlineLeft/>Go back to profile</p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )
}



export default EditProfile;