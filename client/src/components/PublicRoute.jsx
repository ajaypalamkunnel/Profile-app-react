import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const {currentUser} = useSelector((state=>state.user))
  return !currentUser ? <Outlet/> : <Navigate to="/"/>
}

export default PublicRoute