import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom';
const Nav = () => {
   const {isAuthenticated } = useAuth0();
   
   return (
       <div>
           <img
           alt='logo'
           className='logo'
            src='https://img.freepik.com/free-icon/pie-chart_318-372376.jpg?size=626&ext=jpg' />
           {
               isAuthenticated ?

                   <ul className="nav-ul">
                       <li><Link to="/">Reports</Link></li>
                       <li><Link to="/createReport">Create report</Link></li>
                       <li><Link to="/profile">Profile</Link></li>
                       <li><Link to="/logout">Logout</Link></li>
                       
                   </ul>
                   :
                   <ul className="nav-ul nav-right">
                       <li><Link to="/login">Login</Link></li>
                   </ul>
           }
       </div>
   )
}

export default Nav;