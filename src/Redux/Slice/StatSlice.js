import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    allUsersCount: 30,
    subscribedCount: 50
};


export const getStatsData = createAsyncThunk("stats/get", async () => {
    try{
        const response = axiosInstance.get("/admin/stats/users");
        toast.promise(response, {
            loading: "Getting the stats...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to load data stats"
        });
        return (await response.data);
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount || 50;
            state.subscribedCount = action?.payload?.subscribedUserCount || 30;
        })
    }
});

export default statSlice.reducer;