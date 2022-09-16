import React, {useEffect, useState} from 'react';
import Wrapper from "../assets/wrappers/RegisterPage";
import {Logo} from "../components";
import FormRow from "../components/FormRow";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "../features/user/userSlice";
import {useNavigate} from "react-router-dom";


const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
}

const Register = () => {
     const navigate = useNavigate()
    const [values, setValues] = useState(initialState)
    const {user, isLoading} = useSelector(state => state.user)
    const dispatch = useDispatch()


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValues({...values, [name]: value})
    }
    const onSubmit = (e) => {
      e.preventDefault()
        const {name, email, password, isMember} = values
        if (!email || !password || (!isMember && !name)){
            toast.error('Please Fill Out All Fields')
            return;
        }
        if (isMember){
            dispatch(loginUser({email: email, password: password}))
            return;
        }
        dispatch(registerUser({name, email, password}))
    }

    useEffect(()=> {
       if (user){
           setTimeout(()=> {
               navigate('/')
           }, 2000)
       }
    }, [user, navigate])

    const toggleMember = () => {
      setValues({...values,isMember: !values.isMember })
    }

    return (
        <Wrapper className={'full-page'}>

            <form className={'form'} onSubmit={onSubmit}>
                <h3>{values.isMember ? 'Login': 'Register'}</h3>
                <Logo/>

                {!values.isMember && (
                    <FormRow
                        type={'text'}
                        name={'name'}
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

                <FormRow
                    type={'email'}
                    name={'email'}
                    value={values.email}
                    handleChange={handleChange}
                />
                <FormRow
                    type={'password'}
                    name={'password'}
                    value={values.password}
                    handleChange={handleChange}
                />
                <button
                    type={'submit'}
                    className={'btn btn-block'}
                >
                    Submit
                </button>
                <button
                    type={'button'}
                    className={'btn btn-block btn-hipster'}
                    onClick={()=> dispatch(loginUser({email: 'testUser@test.com', password: 'secret'}))}
                >
                    {isLoading? 'loading...': 'demo'}
                </button>
                <p>{values.isMember ? 'Not a member yet?': 'Already a member?'}
                    <button
                        disabled={isLoading}
                        className={'member-btn'}
                        type={'button'}
                        onClick={toggleMember}
                    >
                        {values.isMember ? 'Register': 'Login'}
                    </button>
                </p>
            </form>


        </Wrapper>
    );
};

export default Register;
