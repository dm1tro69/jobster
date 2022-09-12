import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    lobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: ''
}

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {

    },
    extraReducers: {

    }
})

export default jobSlice.reducer
