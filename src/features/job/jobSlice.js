import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import {toast} from "react-toastify";
import {getUserFromLocalStorage} from "../../utils/localStorage";
import {getAllJobs, hideLoading, showLoading} from "../allJobs/allJobsSlice";

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

export const deleteJob = createAsyncThunk('allJobs/deleteJob', async (jobId, thunkApi)=> {
    thunkApi.dispatch(showLoading())
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`, {
            headers: {
                authorization: `Bearer ${thunkApi.getState().user.user.token}`
            }
        })
        thunkApi.dispatch(getAllJobs())
        return resp.data
    }catch (e) {
        thunkApi.dispatch(hideLoading())
        return thunkApi.rejectWithValue(e.response.data.msg)
    }
})

export const editJob = createAsyncThunk('job/editJob', async ({jobId, job}, thunkApi) => {
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
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
        },
        setEditJob: (state, {payload}) => {
            return {...state, isEditing: true, ...payload}
        }
    },
    extraReducers: {
       [createJob.pending]: (state) => {
          state.isLoading = true
       },
        [createJob.fulfilled]: (state) => {
            state.isLoading = false
            toast.success('Job Created')
        },
        [createJob.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },

        [deleteJob.rejected]: (state, {payload}) => {
            toast.error(payload)
        },
        [editJob.pending]: (state) => {
            state.isLoading = true
        },
        [editJob.fulfilled]: (state) => {
            state.isLoading = false
            toast.success('Job Modified...')
        },
        [editJob.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },
    }
})
export const {handleChange, clearValues, setEditJob} = jobSlice.actions
export default jobSlice.reducer
