import { ListItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from './action'
import  Home  from './Home'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Cookies from 'universal-cookie'
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const TableComp = () => {
    const[alluser,setAllUser] = useState()
    const users = useSelector((state) => state.userList)
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const cookies = new Cookies()

    useEffect(()=>{
        setAllUser(users)
        if(users.length === 0){
            cookies.remove('login-user')
            navigate('/')
        }
    },[users])

    const editData =(id)=>{
      navigate(`/Sign-up/${id}`)
    // window.open(`/form/${id}`,'_self')
    }

    const deleteData = (id) =>{
        // const updateList = alluser.filter(item => item.id !== id)
        // setAllUser(updateList)
        dispatch(deleteUser(id))
    }

    const checkEvent = (item) => {
        debugger
    }

    const checkAllEvent = (id) => {
        
    }

    return (
        <div>
            <Home />
            {/* <table border='1'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {alluser?.map((item,i)=>{
                      return(
                          <tr>
                              <td>{i+1}</td>
                              <td>{item.fname}</td>
                              <td>{item.lname}</td>
                              <td>{item.email}</td>
                              <td>{item.pw}</td>
                              <td onClick={()=>editData(item.id)}>Edit</td>
                              <td onClick={()=>deleteData(item.id)}>delete</td>
                          </tr>
                      )
                  })}
                </tbody>
            </table> */}
            <TableContainer component={Paper} style={{width:'60%',margin:'100px auto'}}>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell><ClearAllIcon onClick={()=>checkAllEvent()}/></TableCell>
                        <TableCell>No.</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell colSpan={2} align='center'>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {alluser?.map((item,i) => (
                        <TableRow
                        key={item.email}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell><CheckBoxOutlineBlankIcon onClick={()=>checkEvent(item)}/></TableCell>
                        <TableCell component="th" scope="row">
                        {i+1}
                        </TableCell>
                        <TableCell>{item.fname}</TableCell>
                        <TableCell>{item.lname}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.pw}</TableCell>
                        <TableCell onClick={()=>editData(item.id)} style={{width:'25px',padding:'0 0 0 5px'}}><EditIcon /></TableCell>
                        <TableCell onClick={()=>deleteData(item.id)} style={{width:'25px',padding:'0 5px 0 0'}}><RemoveCircleIcon /></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableComp