import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    userType: null
}

const loginApi = 'http://localhost:5000/api/v1/auth/login'

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }) => {
        try {
            const response = await fetch(
                loginApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            return data;

        } catch (error) {
            console.log('error: ', error);
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            console.log('logout called')
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log('fulfilled', action.payload)
                console.log('freelancerId ', action.payload.freelancerId);
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                state.userType = action.payload.userType;
                localStorage.setItem('token', action.payload.accessToken);
                localStorage.setItem('userId', action.payload.userId)
                localStorage.setItem('userType', action.payload.userType)
                if (action.payload.userType === 'Freelancer') {
                    localStorage.setItem('freelancerId', action.payload.freelancerId);
                }
            })
            .addCase(login.rejected, (state, action) => {
                console.log('rejected')
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;