import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Login/loginSlice";
import profileReducer from '../features/Home/profileSlice'
import experienceReducer from '../features/Experience/expSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        experience: experienceReducer
    }
});

export default store;