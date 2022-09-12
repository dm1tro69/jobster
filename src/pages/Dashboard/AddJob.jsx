import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {toast} from "react-toastify";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import {clearValues, createJob, handleChange} from "../../features/job/jobSlice";

const AddJob = () => {
    const {isLoading, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, isEditing, editJobId} = useSelector(state => state.job)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    useEffect(()=> {
        if (!isEditing){
            dispatch(handleChange({name: 'jobLocation', value: user.location}))
        }
    }, [])
    const handleSubmit = (e) => {
      e.preventDefault()
        if (!position || !company || !jobLocation){
            toast.error('Please Fill Out All Field')
            return;
        }
        dispatch(createJob({position, company, jobLocation, jobType, status}))
    }
    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
       dispatch(handleChange({name, value}))
    }
    return (
        <Wrapper>
            <form className={'form'} onSubmit={handleSubmit}>
                <h3>{isEditing ? 'edit job': 'add job'}</h3>
                <div className={'form-center'}>
                    <FormRow
                        type={'text'}
                        name={'position'}
                        value={position}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type={'text'}
                        name={'company'}
                        value={company}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type={'text'}
                        name={'jobLocation'}
                        labelText={'job location'}
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />

                    <FormRowSelect
                        list={statusOptions}
                        name={'status'}
                        value={status}
                        handleChange={handleJobInput}
                    />
                    <FormRowSelect
                        list={jobTypeOptions}
                        name={'jobType'}
                        value={jobType}
                        handleChange={handleJobInput}
                    />
                    <div className={'btn-container'}>
                        <button
                            type={'button'}
                            onClick={()=> dispatch(clearValues())}
                            className={'btn btn-block clear-btn'}
                        >
                            clear
                        </button>
                        <button
                            type={'submit'}
                            onClick={handleSubmit}
                            className={'btn btn-block submit-btn'}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
