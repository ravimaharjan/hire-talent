

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { put, post } from "../../components/api"
import { toast } from "react-toastify";

const initialState = {
    experienceData: [],
    loading: false,
    error: null
}


export const updateExperience = createAsyncThunk(
    'experience/update',
    async (updatedExp) => {
        try {
            const path = `experience/${updatedExp.id}`
            const toUpdate = {
                data: updatedExp,
                freelancerId: localStorage.getItem('freelancerId')
            }
            // return
            const response = await put(path, toUpdate);

            if (!response.ok) {
                throw new Error('Error to get User Data');
            }
            toast.success("Experience updated successfully.")
            const data = await response.json();
            return data;

        } catch (error) {
            console.log('error: ', error);
            toast.error("Failed to update the experience.")
        }
    }
)

export const addExperience = createAsyncThunk(
    'experience/new',
    async (newExperience) => {
        try {
            const apiPath = `experience`;
            const toAdd = {
                data: newExperience,
                freelancerId: localStorage.getItem('freelancerId')
            }
            const response = await post(apiPath, toAdd);
            toast.success("Experience added successfully");
            return response.json();
        } catch (error) {
            console.log('error', error);
            toast.error("Failed to add the experience.")
        }
    })

const experienceSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setExperience(state, action) {
            state.experienceData = action.payload;
        },
        updateExperienceLocally(state, action) {
            const { index, updatedExperience } = action.payload;
            state.experienceData[index] = updatedExperience;
        }


    },
    extraReducers: builder => {
        builder
            .addCase(updateExperience.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

            })
            .addCase(updateExperience.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            .addCase(addExperience.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addExperience.fulfilled, (state, action) => {
                state.experienceData = [...state.experienceData, action.payload?.data];
                state.loading = false;
                state.error = null;
            })
            .addCase(addExperience.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { setExperience, updateExperienceLocally } = experienceSlice.actions;

export default experienceSlice.reducer;