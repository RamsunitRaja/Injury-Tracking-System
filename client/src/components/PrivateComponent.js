import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navigate, Outlet} from 'react-router-dom'

const PrivateComponent= ()=>{
   const {isAuthenticated}=  useAuth0();
    
    return isAuthenticated ?<Outlet />:<Navigate to="/login" />
}

export default PrivateComponent;