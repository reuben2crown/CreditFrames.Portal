import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import routes from './routes'

const AuthenticatedRoutes = () => {
    const user = window.localStorage.getItem("userData");

    return user ? <Outlet /> : <Navigate to={routes.LandingPage} />
}

export default AuthenticatedRoutes