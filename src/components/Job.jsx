import React from 'react';
import Wrapper from "../assets/wrappers/Job";
import {useDispatch} from "react-redux";
import {FaLocationArrow, FaBriefcase, FaCalendarAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import JobInfo from "./JobInfo";
import moment from 'moment'
import {deleteJob, setEditJob} from "../features/job/jobSlice";

const Job = ({_id,position,company, jobLocation, jobType, createdAt, status}) => {
    const dispatch = useDispatch()
    const data = moment(createdAt).format('MMM Do, YYYY')
    const editJob = () => {
      dispatch(setEditJob({
          editJobId: _id,
          position,
          company,
          jobLocation,
          jobType,
          status
      }))
    }
    return (
        <Wrapper>
          <header>
              <div className={'main-icon'}>{company.charAt(0)}</div>
              <div className={'info'}>
                  <h5>{position}</h5>
                  <p>{company}</p>
              </div>
          </header>
            <div className={'content'}>
                <div className={'content-center'}>

                    <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
                    <JobInfo icon={<FaCalendarAlt/>} text={data}/>
                    <JobInfo icon={<FaBriefcase/>} text={status}/>
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className={'actions'}>
                        <Link to={'/add-jobs'} className={'btn edit-btn'} onClick={editJob}>
                            Edit
                        </Link>
                        <button
                            className={'btn delete-btn'}
                            onClick={()=> dispatch(deleteJob(_id))}
                            type={'button'}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>

        </Wrapper>
    );
};

export default Job;
