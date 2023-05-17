import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AddUser, EditUser } from './action'
import './Signup.css'
import  Home  from './Home'
import Cookies from 'universal-cookie'
import alertify from "alertifyjs";


const Signup = () => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const dispatch = useDispatch()
    const {userId} = useParams()
    const [user, setUser] = useState({
        // id:Math.random().toString(),
        fname: '',
        lname: '',
        email: '',
        pw: '',
        phNo: '',
        check:false
    })
    const [editFlag,setEditFlag]=useState(false)
    const [allUser, setAllUser] = useState(useSelector((state)=>state.userList))

    useEffect(()=>{
        console.log('>>>>>>>',userId);
        const editUser = allUser && allUser.length > 0 && userId !== undefined && allUser.find(item=> item.id === userId)
        console.log('edit',editUser);
        setUser(editUser)
        userId !== undefined && setEditFlag(true)
    },[])

    const inputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
       console.log('user',user);
       if(editFlag) {
           dispatch(EditUser(user))
           navigate('/table')
        }
       else {
            user.id=Math.random().toString()
            dispatch(AddUser(user))
            var data={
                email:user.email
            }
            cookies.set('user',data,{})
            console.log('cookie',cookies.get('user'));
            alertify.success('Register successful!!!')
            // navigate('/table')
            navigate('/profile')
            window.location.reload()
       } 
    }

    return (
        <div>
            { console.log('>',userId)}
            <Home />
             <>
            <div className="SignUp_style">
            <p className='Login_style_para'>{editFlag ? 'update Info' : 'Create Account'}</p>
            <form onSubmit={onSubmit}>
               <label htmlFor="fname">FirsrName</label>
               <input type="text" id="fname" name="fname" value={user.fname} placeholder="First Name" onChange={e => inputChange(e)} />
            
               <label htmlFor="lname">LastName</label>
               <input type="text" id="lname" name="lname" value={user.lname} placeholder="Last Name" onChange={e => inputChange(e)} />
               
               <label htmlFor="email">Email</label>
               <input type="email" id="email" name="email" value={user.email} disabled={editFlag ? 'disabled' : ''} placeholder="Enter Email" onChange={e => inputChange(e)} />
               
               <label htmlFor="pw">Password</label>
               <input type="text" id="pw" name="pw" value={user.pw} placeholder="Enter Password" onChange={e => inputChange(e)} />
               
               <label htmlFor="phNo">Phone Number</label>
               <input type="number" id="phNo" name="phNo" value={user.phNo} placeholder="Enter Number" onChange={e => inputChange(e)} />
              
            
               <button type="submit">{editFlag ? 'update' : 'Signup'}</button>

               <p className='Login_style_or'>Or:</p>
               <Link to='/Sign-in'>Sign In<i class="fa fa-arrow-right"></i></Link>
            </form>
        </div>
        </>
        </div>
    )
}

export default Signup