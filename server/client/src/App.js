import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import NavBar from "./components/Navbar"
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom"
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Form from './components/screens/Form';
import CreateDept from './components/screens/CreateDept';
import {reducer,initialState} from './reducers/userReducer'
import PendingForm from './components/screens/Pending';
import ApprovedForm from './components/screens/Approved';
import RejectForm from './components/screens/Reject';
import RequestApprovalForm from './components/screens/RequestApproval';
import ApprovalPage from './components/screens/ApprovalPage';

export const UserContext = createContext();

const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push("/signin")
    }
  },[])

  return (
    <Switch>
      <Route path="/signin"><Signin/></Route>
      <Route path="/createDept"><CreateDept/></Route>
      <Route path="/signup"><Signup/></Route>
      <Route path="/form"><Form/></Route>
      <Route path="/pendingform"><PendingForm/></Route>
      <Route path="/approvedform"><ApprovedForm/></Route>
      <Route path="/rejectform"><RejectForm/></Route>
      <Route path="/allrequest"><RequestApprovalForm/></Route>
      <Route path="/approvalpage"><ApprovalPage/></Route>
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;