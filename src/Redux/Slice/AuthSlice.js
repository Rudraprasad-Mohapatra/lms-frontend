import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        // const res = axiosInstance.post("user/register", data);

        // toast.promise(res, {
        //     loading: "Wait! creating your account",
        //     success: (data) => {
        //         return data?.data?.message;
        //     },
        //     error: "Failed to create account"
        // });
        // console.log(res);
        // return res.data;
        // ---------------------------------------
        // const response = await axiosInstance.post("user/register", data);
        // console.log("Hii");
        // console.log(response);
        // const responseData = response.data; // Extract data from the response
        // console.log(responseData);
        // // Show toast messages based on the response data
        // toast.success(responseData?.message || "Operation Succeeded");
        // console.log(response);
        // // Return the response data
        // return responseData;
        // ----------------------------------------
        axiosInstance.post("user/register", data,  { withCredentials: true })
            .then(response => {
                // Handle a successful response here
                console.log(response.data); // This will log the data received from the server
                toast.success(response.data?.message || "Operation Succeeded");
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.log(error.message);
                toast.error(error.message);
            });

    } catch (error) {
        // toast.error(error?.response?.data?.message);
        toast.error(error.message);
    }

})




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
});

// export const {} = authSlice.actions;
export default authSlice.reducer;