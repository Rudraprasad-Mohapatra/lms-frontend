import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const res = axiosInstance.get("/course/");
        toast.promise(res, {
            loading: "loading course data...",
            success: "Course loaded successfully",
            error: "Failed to get the courses"
        });
        return (await res).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }

})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log("Action is", action);
                    state.courseData = [...action.payload];
                    console.log("CourseData is ", state.courseData);
                }
            })
    }
}
)

export default courseSlice.reducer;