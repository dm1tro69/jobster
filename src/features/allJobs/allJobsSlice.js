import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import stats from "../../pages/Dashboard/Stats";
import {toast} from "react-toastify";


const initialFilterState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}
const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFilterState
}

export const showStats = createAsyncThunk('allJobs/showStats', async (_, thunkAPI) => {
    try {
        const resp = await customFetch.get('jobs/stats', {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        return resp.data
    }catch (e) {
        thunkAPI.rejectWithValue(e.response.data.msg)
    }
})

export const getAllJobs = createAsyncThunk('allJobs/getJobs', async (_, thunkAPI)=> {
    const {page, search, searchStatus, searchType, sort} = thunkAPI.getState().allJobs
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
    if (search){
        url = url + `&search=${search}`
    }
    try {
        const resp = await customFetch.get(url, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        return resp.data
    }catch (e) {
        thunkAPI.rejectWithValue(e.response.data.msg)
    }
})



const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers: {
       showLoading: (state) => {
           state.isLoading = true
       },
        hideLoading: (state) => {
            state.isLoading = false
        },
        handleChanges: (state, {payload: {name, value}}) => {
           state[name] = value
        },
        clearFilters: (state) => {
           return {...state, ...initialFilterState}
        },
        changePage: (state, {payload}) => {
           state.page = payload
        }
    },
    extraReducers: {
        [getAllJobs.pending]: (state) => {
            state.isLoading = true
        },
        [getAllJobs.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.jobs = payload.jobs
            state.numOfPages = payload.numOfPages
            state.totalJobs = payload.totalJobs
        },
        [getAllJobs.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },
        [showStats.pending]: (state) => {
            state.isLoading = true
        },
        [showStats.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.stats = payload.defaultStatus
            state.monthlyApplications = payload.monthlyApplications
        },
        [showStats.rejected]: (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },
    }
})
export const {showLoading, hideLoading, clearFilters, handleChanges, changePage} = allJobsSlice.actions
export default allJobsSlice.reducer
