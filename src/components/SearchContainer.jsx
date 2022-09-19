import React from 'react';
import Wrapper from "../assets/wrappers/SearchContainer";
import {useDispatch, useSelector} from "react-redux";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import {clearFilters, handleChanges} from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
    const {isLoading, search, searchStatus, searchType, sort, sortOptions} = useSelector(state => state.allJobs)
    const {jobTypeOptions, statusOptions} = useSelector(state => state.job)
    const dispatch = useDispatch()
    const handlerChange = (e) => {
        if (isLoading) return
        dispatch(handleChanges({name: e.target.name, value: e.target.value}))
    }
    const handleSubmit = (e) => {
      e.preventDefault()
        dispatch(clearFilters())
    }
    return (
        <Wrapper>
            <form className={'form'}>
                <h4>search form</h4>
                <div className={'form-center'}>
                    <FormRow
                        type={'text'}
                        name={'search'}
                        value={search}
                        handleChange={handlerChange}
                    />
                    <FormRowSelect
                        labelText={'status'}
                        name={'searchStatus'}
                        value={searchStatus}
                        handleChange={handlerChange}
                        list={['all', ...statusOptions]}
                    />
                    <FormRowSelect
                        labelText={'type'}
                        name={'searchType'}
                        value={searchType}
                        handleChange={handlerChange}
                        list={['all', ...jobTypeOptions]}
                    />
                    <FormRowSelect
                        name={'sort'}
                        value={sort}
                        handleChange={handlerChange}
                        list={sortOptions}
                    />
                    <button className={'btn btn-block btn-danger'} disabled={isLoading} onClick={handleSubmit}>
                          clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;
