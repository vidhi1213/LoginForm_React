import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Header.css'
import Cookies from 'universal-cookie'
import { useSelector } from 'react-redux'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';


const Home = () => {
    const { userId } = useParams()
    const [loginUser, setLoginUser] = useState()
    const [showusers, setShowUsers] = useState(false)
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [allUser, setAllUser] = useState(useSelector((state) => state.userList))

    useEffect(() => {
        let ck = cookies.get('user')
        let login_ck = cookies.get('login-user')
        let userInfo = allUser.find(item => item.email === ck?.email ||  login_ck?.email || '')
        userInfo && setLoginUser(userInfo)
        login_ck && login_ck !== undefined && setShowUsers(true)
    }, [])

      const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
        },
      }));

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue === 'Sign-out') {
            cookies.remove('user')
            cookies.remove('login-user')
            navigate('/Sign-in')
        }
        else navigate(`/${newValue}`)
    };


    return (
        <div className={classes.root}>
            {console.log('showusers',showusers)}
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className='navbar'>
            <Tab label="Home" value=''/>
            { (loginUser  ) ? <Tab label="Sign out" value='Sign-out'/> :<Tab label="Sign In/register"  value='Sign-in'/>}
            { (loginUser ) && <Tab label='Profile' value='profile'/> }
            {showusers  &&  <Tab label='Users' value='table'/>}
          </Tabs>
        </AppBar>
        <p className={`${window.location.pathname === '/' ? '' : 'sd_hidden'}`}>{(loginUser) ? `hi, ${loginUser?.fname} ${loginUser?.lname}`: 'Home Page'}</p>
      </div>
    )
}

export default Home
