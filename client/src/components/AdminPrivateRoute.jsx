import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPrivateRoute = () => {
    const {adminData} = useSelector((state)=>state.admin)
  
    return adminData ? <Outlet/> : <Navigate to="/login-admin"/>
}

export default AdminPrivateRoute