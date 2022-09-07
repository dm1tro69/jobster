import React, {useEffect, useState} from 'react';
import Wrapper from "../assets/wrappers/RegisterPage";
import {Logo} from "../components";
import FormRow from "../components/FormRow";
import {toast} from "react-toastify";


const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
}

const Register = () => {

    const [values, setValues] = useState(initialState)

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

        }
    }

    useEffect(()=> {

    }, [])

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
                <p>{values.isMember ? 'Not a member yet?': 'Already a member?'}
                    <button
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
