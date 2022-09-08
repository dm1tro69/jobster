import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import customFetch from "../../utils/axios";
import {addUserToLocalStorage, getUserFromLocalStorage} from "../../utils/localStorage";

const initialState = {
   isLoading: false,
    user: getUserFromLocalStorage()

}

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI)=> {
    try {
        const resp = await customFetch.post('/auth/register', user)
       return resp.data
    }catch (e) {
       return thunkAPI.rejectWithValue(e.response.data.msg)
    }
})
export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkApi)=> {
    try {
        const resp = await customFetch.post('auth/login', user)
        return resp.data
    }catch (e) {
        return thunkApi.rejectWithValue(e.response.data.msg)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, {payload})=> {
            const {user} = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Hello There ${user.name}`)
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false
            toast.error(action.payload)
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            const {user} = payload
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Hi ${user.name}`)
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false
            toast.error(action.payload)
        }
    }
})
export default userSlice.reducer