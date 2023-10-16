import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer, {  } from "./Slice/AuthSlice";
import courseSliceReducer from "./Slice/CourseSlice.js";
import LectureSliceReducer from "./Slice/LectureSlice";
import razorpaySliceReducer from "./Slice/RazorPaySlice.js"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: razorpaySliceReducer,
        lecture: LectureSliceReducer
    },
    devTools: true
})

export default store;