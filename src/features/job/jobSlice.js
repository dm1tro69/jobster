import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import {toast} from "react-toastify";
import {getUserFromLocalStorage} from "../../utils/localStorage";

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: ''
}

export const createJob = createAsyncThunk('job/createJob', async (job, thunkApi) => {
    try {
        const resp = await customFetch.post('/jobs', job, {
            headers: {
                authorization: `Bearer ${thunkApi.getState().user.user.token}`
            }
        })
        thunkApi.dispatch(clearValues())
        return resp.data
    }catch (e) {
      return thunkApi.rejectWithValue(e.response.data.msg)
    }
})

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, {payload: {name, value}}) => {
            state[name] = value
        },
        clearValues: () => {
            return {
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location || ''
            }
        }
    },
    extraReducers: {
       [createJob.pending]: (state) => {
          state.isLoading = true
       },
        [createJob.fulfilled]: (state, action) => {
            state.isLoading = false
            toast.success('Job Created')
        },
        [createJob.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        }
    }
})
export const {handleChange, clearValues} = jobSlice.actions
export default jobSlice.reducer
