import React, {useState} from 'react';
import Wrapper from "../assets/wrappers/Navbar";
import {FaAlignLeft, FaUserCircle, FaCaretDown} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import Logo from "./Logo";
import {toggleSidebar} from "../features/user/userSlice";

const Navbar = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const [showLogout, setShowLogout] = useState(false)
    const toggle = () => {
      dispatch(toggleSidebar())
    }
    return (

        <Wrapper>
            <div className={'nav-center'}>
                <button
                    className={'toggle-btn'}
                    onClick={toggle}
                    type={'button'}
                >
                    <FaAlignLeft/>
                </button>
                <div>
                    <Logo/>
                    <h3 className={'logo-text'}>dashboard</h3>
                </div>
                <div className={'btn-container'}>
                    <button
                        type={'button'}
                        className={'btn'}
                        onClick={()=> setShowLogout(!showLogout)}
                    >
                        <FaUserCircle/>
                        {user?.user.name}
                        <FaCaretDown/>
                    </button>
                    <div className={showLogout?'dropdown show-dropdown': 'dropdown'}>
                        <button
                            type={'button'}
                            className={'dropdown-btn'}
                            onClick={()=> console.log('logout user')}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>

        </Wrapper>
    );
};

export default Navbar;
