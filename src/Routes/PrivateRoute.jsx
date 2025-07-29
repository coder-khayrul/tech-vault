import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Components/Loader';

const PrivateRoute = ({children}) => {
    const {user,loader} = use(AuthContext)
    const location = useLocation()
     if (loader) {
        return <Loader></Loader>
    }
    if (user) {
        return children
    }
    return <Navigate to={"/login"} state={location.pathname}></Navigate>

};

export default PrivateRoute;