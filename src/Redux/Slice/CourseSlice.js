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

export const createNewCourse = createAsyncThunk("/course/", async(data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
        formData.forEach((ele)=> console.log(ele));
        const response = axiosInstance.post("/course", formData);
        toast.promise(response, {
            loading:"Creating new course",
            success: "Course created uccessfully",
            error: "Failed to create course"
        });

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const res = axiosInstance.delete(`/course/${id}`);
        toast.promise(res, {
            loading: "deleting course ...",
            success: "Course deleted successfully",
            error: "Failed to delete the course"
        });
        return (await res).data;
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
                    // console.log("Action is", action);
                    state.courseData = [...action.payload];
                    console.log("CourseData is ", state.courseData);
                }
            })
    }
}
)

export default courseSlice.reducer;