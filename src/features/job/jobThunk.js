import customFetch from "../../utils/axios";
import {clearValues} from "./jobSlice";
import {getAllJobs, hideLoading, showLoading} from "../allJobs/allJobsSlice";


export const createJobThunk = async (job, thunkAPI) => {
    try {
        const resp = await customFetch.post(`jobs`, job, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return resp.data
    }catch (e) {

    }
}
export const deleteJobThunk = async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading())
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(getAllJobs())
        return resp.data
    }catch (e) {
        thunkAPI.dispatch(hideLoading())
        return thunkAPI.rejectWithValue(e.response.data.msg)
    }

}

export const editeJobThunk = async ({jobId, job}, thunkAPI) => {
    thunkAPI.dispatch(showLoading())
    try {
        const resp = customFetch.patch(`/jobs/${jobId}`, job,{
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return resp.data
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.data.msg)
    }
}

