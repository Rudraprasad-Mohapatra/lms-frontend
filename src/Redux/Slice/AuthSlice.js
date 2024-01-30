import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post("/user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        const finalRes = (await res).data;
        console.log(finalRes);
        return finalRes;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }

})

export const forgotPassword = createAsyncThunk("/auth/forgotpassword", async (data) => {
    try {
        const res = axiosInstance.post("/user/forgotpassword", data);
        toast.promise(res, {
            loading: "Sending email for password reset...",
            success: (response) => {
                return response?.data?.message
            },
            error: "Unable to send email at this time..."
        })
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const resetPassword = createAsyncThunk("/auth/reset-password", async ({ passwordResetData, accessToken }) => {
    try {
        console.log("I am data inside slice resetPassword", passwordResetData)
        console.log("I am accesstoken inside slice", accessToken);
        const res = axiosInstance.post(`/user/reset/${accessToken}`, passwordResetData);
        toast.promise(res, {
            loading: "Resetting your password...",
            success: (response) => {
                return response?.data?.message
            },
            error: "Unable to reset your password at this time..."
        })
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait logout in progress",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to log out"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update/`, data);
        toast.promise(res, {
            loading: "Wait profile update in progress",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to update profile"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getUserData = createAsyncThunk("/user/details/profile", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch (error) {
        toast.error(error.message)
    }
})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log("Action is ", action);
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));

                localStorage.setItem("isLoggedIn", true);

                localStorage.setItem("role", action?.payload?.user?.role);

                state.isLoggedIn = action?.payload?.success;

                state.data = action?.payload?.user;

                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));

                localStorage.setItem("isLoggedIn", true);

                localStorage.setItem("role", action?.payload?.user?.role);

                state.isLoggedIn = true;

                state.data = action?.payload?.user;

                state.role = action?.payload?.user?.role;
            })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;