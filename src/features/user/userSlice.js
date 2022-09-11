import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import customFetch from "../../utils/axios";
import {addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage} from "../../utils/localStorage";

const initialState = {
   isLoading: false,
    isSidebarOpen: false,
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
export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI)=> {
  try {
      const resp = await customFetch.patch('auth/updateUser', user, {
          headers: {
              authorization: `Bearer ${thunkAPI.getState().user.user.token}`
          }
      })
      return resp.data
  }catch (e) {
      console.log(e.response)
      return thunkAPI.rejectWithValue(e.response.data.msg)
  }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       toggleSidebar: (state) => {
           state.isSidebarOpen = !state.isSidebarOpen
       },
        logoutUser: (state) => {
           state.user = null
            state.isSidebarOpen = false
            removeUserFromLocalStorage()
        }
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
        },
        [updateUser.pending]: (state) => {
           state.isLoading = true
        },
        [updateUser.fulfilled]: (state, {payload}) => {
            const {user} = {payload}
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success('User Updated')
        },
        [updateUser.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        }
    }
})
export const {toggleSidebar, logoutUser} = userSlice.actions
export default userSlice.reducer
