import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/course");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Course loaded successfully",
            error: "Failed to get the courses"
        });
        const finalRes = (await response).data.courses;
        console.log("finalres is ",finalRes);
        return finalRes;
    } catch (error) {
        toast.error(error?.response?.data?.mssage);
    }

})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                if(action.payload){
                    console.log("Action is", action);
                    state.courseData = [...action.payload];
                    console.log("CourseData is ",state.courseData);
                }
            })
    }
}
)

export default courseSlice.reducer;