import React, { useEffect, useState } from 'react'
import { getAllUser } from '../service/user'
import "./style.css"
import { useNavigate } from 'react-router-dom'

function UserList() {
    const [userList,setuserList]=useState([])
    const navigate=useNavigate()
    const getUserData =async()=>{
        let userDarta =await getAllUser() 
        console.log(userDarta,"userDarta")
        if(userDarta.data.code==200){

            setuserList(userDarta.data.data)
        }
    }
    useEffect(() => {
        getUserData()
    }, [])
        console.log(userList,"userList")
    return (
        <div className='mainDiv'>
            <div>
                <button onClick={()=>navigate("/")}>Go to Form</button>
            <table className='table'>
                <thead>
                    <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>gender</th>
                    <th>Date Of Birth</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Country</th>
                    </tr>
                </thead>
            {userList.map((item)=>{
                return <tr>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.eMail}</td>
                    <td>{item.gender}</td>
                    <td>{item.dob}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td>{item.country}</td>

                </tr>
            })}
            </table>
            </div>
        </div>
    )
}

export default UserList