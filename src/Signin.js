import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';
import './Signin.css'
import alertify from "alertifyjs";

const Signin = () => {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const [user,setUser] = useState({
        uname:'',
        pw:''
    })
    const [allUser, setAllUser] = useState(useSelector((state)=>state.userList))

    const inputEvent = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const valid = () =>{
        let findUser = allUser.find(item => (item.email === user.uname && item.pw === user.pw))
        console.log('size',findUser);
        return findUser && findUser !== undefined ? true :false
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        if(valid()){
            var data = {
                email:user.uname
            }
            cookies.set('login-user', data ,{})
            alertify.success('login successful!!!')
            navigate('/table')
            window.location.reload()
        }
        else alertify.error('login failed!!!')
    }

    return (
        <>
         <Home />
            <div className="Login_style">
                <p className='Login_style_para'>Sign In</p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="uname">UserName</label>
                    <input type="text" id="uname" name="uname" value={user.uname} placeholder="Enter Username" onChange={inputEvent} />
                    {/* <lable style={{ color: "red", fontSize: "14px" }}>{data.unameErr}</lable> */}
                    <label htmlFor="pw">Password</label>
                    <input type="text" id="pw" name="pw" value={user.pw} placeholder="Enter Password" onChange={inputEvent} />
                    {/* <lable style={{ color: "red", fontSize: "14px" }}>{data.pwErr}</lable> */}
                    <button type="submit">Login</button>
                    <p className='Login_style_or'>Or:</p>
                    <Link to='/Sign-up'>Create an Account <i class="fa fa-arrow-right"></i></Link>
                </form>
            </div>
        </>
    );
};

export default Signin;
