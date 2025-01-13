import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPublicRoute = () => {
    const {adminData} = useSelector((state)=>state.admin)
  return !adminData ? <Outlet/> : <Navigate to="/home-admin"/>
}

export default AdminPublicRoute