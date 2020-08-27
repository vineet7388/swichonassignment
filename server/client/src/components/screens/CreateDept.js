import React,{useState,useEffect} from "react"
import { useHistory } from "react-router-dom"
import M from "materialize-css"

const CreateDept = ()=>{
    const history = useHistory();
    const [name,setName] = useState("");
    const [departmentHead,setDepartmentHead] = useState("");



    const uploadFields = ()=>{
        fetch("/createdept",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                dept_head:departmentHead
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div className="mycard ">
        <div className="card auth-card ">
        <h2 className="brand-logo">Moments</h2>
        <input type = "text"
        placeholder = "name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input type = "text"
        placeholder = "Deppartment Head"
        value={departmentHead}
        onChange={(e)=>setDepartmentHead(e.target.value)}
        />
        <button className="btn waves-effect teal darken-1" type="submit" name="action" onClick={()=>uploadFields()}>Submit
        </button>
        </div>
        </div>
    )
}

export default CreateDept