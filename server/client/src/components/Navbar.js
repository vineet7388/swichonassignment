import React,{useContext} from "react";
import {Link,useHistory} from "react-router-dom";
import {UserContext} from "../App";

const NavBar = () => {

  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();
  const renderList = ()=>{
    if(state){
      return [
            <li><Link to="/form">Form</Link></li>,
            <li><Link to="/approvedform">Approved</Link></li>,
            <li><Link to="/rejectform">Rejected</Link></li>,
            <li><Link to="/allrequest">All Pending</Link></li>,
            <li><Link to="/pendingform">Pending</Link></li>,
            <li>
              <button className="btn red darken-1"
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
              }}
               >
                Logout
            </button>
            </li> 
      ]
    }
    else{
          return [
          <li><Link to="/signin">Login</Link></li>,
          <li><Link to="/signup">Signup</Link></li>
        ]
    }
  }

    return (
        <nav>
        <div className="nav-wrapper black">
        <Link to={state ? '/approvalpage' : "/signin"}>Approve Requests</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default NavBar