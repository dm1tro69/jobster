import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {toast} from "react-toastify";
import FormRow from "../../components/FormRow";
import {updateUser} from "../../features/user/userSlice";

const Profile = () => {
    const {isLoading, user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [userData, setUserdata] = useState({
        name:user?.name || '',
        email: user?.email || '',
        lastName: user?.lastName || '',
        location: user?.location || ''
    })

    const handleSubmit = (e) => {
        const {name, location, lastName, email} = userData
      e.preventDefault()
        if (!name || !email || !lastName || !location){
            toast.error('Please Fill Out All Fields')
            return;
        }
        dispatch(updateUser({name, email, lastName, location}))
    }
    const handleChange = (e) => {
      setUserdata({...userData, [e.target.name]: e.target.value})
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit} className={'form'}>
                <h3>profile</h3>
               <div className={'form-center'}>
                   <FormRow
                       name={'name'}
                       value={userData.name}
                       type={'text'}
                       handleChange={handleChange}

                   />
                   <FormRow
                       name={'lastName'}
                       value={userData.lastName}
                       labelText={'last name'}
                       type={'text'}
                       handleChange={handleChange}

                   />
                   <FormRow
                       name={'email'}
                       value={userData.email}
                       type={'text'}
                       handleChange={handleChange}

                   />
                   <FormRow
                       name={'location'}
                       value={userData.location}
                       type={'text'}
                       handleChange={handleChange}

                   />
                   <button
                       type={'submit'}
                       className={'btn btn-block'}
                       disabled={isLoading}
                   >
                       {isLoading? 'Please Wait...': 'save changes'}
                   </button>
               </div>

            </form>
        </Wrapper>
    );
};

export default Profile;
