import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = "http://localhost:5000/api/auth";
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false
}

export const userLogin = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const { data } = await axios.post(`${baseUrl}/login`, { username, password }, config);
        
        localStorage.setItem('userToken', data.token);
        return data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem("userToken");
    return "";
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.userToken
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [logout.fulfilled]: (state, {payload}) => {
            state.userInfo = null;
            state.userToken = null;
        }
    }
});

export default authSlice.reducer;