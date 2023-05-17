import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import Home from './Home';

const Profile = () => {
    const [loginUser, setLoginUser] = useState()
    const [allUser, setAllUser] = useState(useSelector((state) => state.userList))
    const cookies = new Cookies()
    useEffect(() => {
        let ck = cookies.get('user')
        let login_ck = cookies.get('login-user')
        let userInfo = allUser.find(item => item.email === ck?.email || login_ck?.email || '')
        userInfo && setLoginUser(userInfo)
    }, [])

  return (
      <>
        <Home />
        <div>
          user profile
        </div>
        <p>first name:{loginUser?.fname}</p>
        <p>last name:{loginUser?.lname}</p>
      </>
    
  );
};

export default Profile;
