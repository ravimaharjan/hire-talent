import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { put } from "../../components/api"
import { setExperience } from "../Experience/expSlice"

const initialState = {
    profileData: null,
    loading: false,
    error: null
}

const profileEndpoint = 'http://localhost:5000/api/v1/user'

export const profileData = createAsyncThunk(
    'home/profile',
    async (arg, { getState, dispatch }) => {
        try {
            const state = getState();

            const userId = localStorage.getItem('userId');
            const userType = localStorage.getItem('userType');
            const profileApi = profileEndpoint + `/${userId}?userType=${userType}`
            const response = await fetch(
                profileApi, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Error to get User Data');
            }

            const jsonResponse = await response.json();
            dispatch(setExperience(jsonResponse?.data?.freelancerInfo?.workExperience))

            return jsonResponse;

        } catch (error) {
            console.log('error: ', error);
        }
    }
)

export const editExperience = createAsyncThunk(
    "experience/editExperience",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const userId = localStorage.getItem('userId');
            const path = `experience/${userId}`
            const response = await put(path, updates);
            return response.data; // Updated employment
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(profileData.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(profileData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.profileData = action.payload
                const { data } = action.payload

                if (data.userType === 'Freelancer') {
                    localStorage.setItem('freelancerId', data?.freelancerId ?? null);
                }
            })
            .addCase(profileData.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

// export const { logout } = profileSlice.actions;

export default profileSlice.reducer;