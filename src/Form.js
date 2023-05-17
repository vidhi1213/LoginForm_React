import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AddUser, EditUser } from './action'
import './Form.css'
import  Home  from './Home'

const Form = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userId} = useParams()
    const [user, setUser] = useState({
        fname: '',
        lname: '',
        email: '',
        pw: '',
        phNo: '',
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
            dispatch(AddUser(user))
            navigate('/table')
       } 
    }

    return (
        <div>
            { console.log('>',userId)}
            <Home />
            {/* <form onSubmit={onSubmit}>
                <div className='formWidth d_flex'>
                    <div className='formgroup'>
                        <label for='fname' className='formlabel'>First Name</label>
                        <input type='text' name='fname' value={user.fname} id='fname' placeholder='First Name' onChange={e => inputChange(e)} />
                    </div>
                    <div className='formgroup'>
                        <label for='lname' className='formlabel'>Last Name</label>
                        <input type='text' name='lname' value={user.lname} id='lname' placeholder='Last Name' onChange={e => inputChange(e)} />
                    </div>
                    <div className='formgroup'>
                        <label for='email' className='formlabel'>Email</label>
                        <input  name='email' value={user.email} id='email' placeholder='Email' disabled={editFlag ? 'disabled' : ''} onChange={e => inputChange(e)} />
                    </div>
                    <div className='formgroup'>
                        <label for='pw' className='formlabel'>Password</label>
                        <input  name='pw' value={user.pw} id='pw' placeholder='Password' onChange={e => inputChange(e)} />
                    </div>
                    <div className='formgroup'>
                        <label for='phNo' className='formlabel'>Phone Number</label>
                        <input type='number' name='phNo' value={user.phNo} id='phNo' placeholder='Number' onChange={e => inputChange(e)} />
                    </div>
                    <button className='formbtn'>{editFlag ? 'update' : 'submit'}</button>
                </div>
            </form> */}
             <>
        <h1>Welcome to SignUp Page</h1>
        <div className="SignUp_style">
            <h1> Signup Page</h1>
            <form onSubmit={onSubmit}>
               <label htmlFor="fname">FirsrName</label>
               <input type="text" id="fname" name="fname" value={user.fname} placeholder="First Name" onChange={e => inputChange(e)} />
            
               <label htmlFor="lname">LastName</label>
               <input type="text" id="lname" name="lname" value={user.lname} placeholder="Last Name" onChange={e => inputChange(e)} />
               
               <label htmlFor="email">Email</label>
               <input type="email" id="email" name="email" value={user.email} placeholder="Enter Email" onChange={e => inputChange(e)} />
               
               <label htmlFor="pw">Password</label>
               <input type="text" id="pw" name="pw" value={user.pw} placeholder="Enter Password" onChange={e => inputChange(e)} />
               
               <label htmlFor="phNo">Phone Number</label>
               <input type="number" id="phNo" name="phNo" value={user.phNo} placeholder="Enter Number" onChange={e => inputChange(e)} />
              
            
               <button type="submit">Signup</button>
            </form>
        </div>
        </>
        </div>
    )
}

export default Form