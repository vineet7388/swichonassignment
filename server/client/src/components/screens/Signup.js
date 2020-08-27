import React,{useState,useEffect} from "react"
import { Link,useHistory } from "react-router-dom"
import M from "materialize-css"

const Signup = ()=>{
    const history = useHistory();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [department,setDepartment] = useState("");



    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        const eml = email.toLowerCase(); 
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email:eml,
                department
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div className="mycard ">
        <div className="card auth-card ">
        <h2 className="brand-logo">MERN</h2>
        <input type = "text"
        placeholder = "name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input type = "text"
        placeholder = "email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type = "password"
        placeholder = "password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
         <input type = "text"
        placeholder = "department"
        value={department}
        onChange={(e)=>setDepartment(e.target.value)}
        />
        <button className="btn waves-effect teal darken-1" type="submit" name="action" onClick={()=>uploadFields()}>Submit
        </button>
        <h6>
            <Link to="/signin">Already Have an Account ?</Link>
        </h6>
        </div>
        </div>
    )
}

export default Signup