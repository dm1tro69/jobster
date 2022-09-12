import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {toast} from "react-toastify";
import FormRow from "../../components/FormRow";

const AddJob = () => {
    const {isLoading, position, company, jobLocation, jobType, jobTypeOption, status, statusOption, isEditing, editJobId} = useSelector(state => state.job)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
      e.preventDefault()
        if (!position || !company || !jobLocation){
            toast.error('Please Fill Out All Field')
            return;
        }
    }
    const handleJobInput = (e) => {

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
                    <div className={'btn-container'}>
                        <button
                            type={'button'}
                            onClick={()=> console.log('clear')}
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
