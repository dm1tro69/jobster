import React from 'react';
import errorImg from '../assets/images/not-found.svg'
import {Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
    return (
        <Wrapper className={'full-page'}>
            <div>
                <img src={errorImg} alt="not found"/>
                <h3>Error Page</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <Link to={'/'}>back home</Link>
            </div>
        </Wrapper>
    );
};

export default Error;
