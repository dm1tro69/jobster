import React from 'react';
import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import {useDispatch, useSelector} from "react-redux";
import {changePage} from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
    const dispatch = useDispatch()
    const {page, numOfPages} = useSelector(state => state.allJobs)
    const pages = Array.from({length: numOfPages}, (_, index) => {
        return index + 1
    })


    const nextPage = () => {
       let newPage = page + 1
        if (newPage > numOfPages){
            newPage = 1
        }
        dispatch(changePage(newPage))
    }
    const prevPage = () => {
        let newPage = page - 1
        if (newPage < 1){
            newPage = numOfPages
        }
        dispatch(changePage(newPage))
    }
    return (
        <Wrapper>
            <button className={'prev-btn'} onClick={prevPage}>
                <HiChevronDoubleLeft/>
                prev
            </button>
            <div className={'btn-container'}>
                {pages.map((pageNumber) => {
                    return (
                        <button
                            type={'button'}
                            className={pageNumber === page? 'pageBtn active': 'pageBtn'}
                            onClick={()=> dispatch(changePage(pageNumber))}
                            key={pageNumber}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>
            <button className={'next-btn'} onClick={nextPage}>
                <HiChevronDoubleRight/>
                next
            </button>
        </Wrapper>
    );
};

export default PageBtnContainer;
