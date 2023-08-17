
import React from "react"
import { Link, useNavigate } from "react-router-dom";
const Nav=()=>{
    const auth=localStorage.getItem('user');
    const navigate = useNavigate();
    const logout=()=>{
       localStorage.clear();
       navigate('/signup')
    }
    return(
        <div>
            <img alt="logo"  className="logo" src= "https://economictimes.indiatimes.com/thumb/height-450,width-600,imgsize-58252,msid-100299251/the-top-7-skills-every-product-manager-needs-to-succeed.jpg?from=mdr" />
        { auth ? <ul className="nav-ul">
            <li> <Link to = '/'>Product</Link> </li>
            <li> <Link to = '/add'>Add product</Link> </li>
            <li> <Link to = '/update'>Update product</Link> </li>
           { /*<li> <Link to = '/profile'>Profile</Link> </li>*/}
            <li> <Link onClick={logout} to = '/signup'>Logout ({JSON.parse(auth).name}) </Link></li>
          </ul>
          :
            <ul className="nav-ul nav-right">
                <li><Link to = '/signup'>Sign UP</Link></li>
                <li><Link to= '/login'>Login</Link></li>
            </ul>
        }
        </div>
    )
}

export default Nav;