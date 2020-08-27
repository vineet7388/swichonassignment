import React,{useState,useEffect} from "react"
import M from 'materialize-css'

const Form=()=>{
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [assignedTo,setAssignedTo] = useState("");
    const [deptData,setDeptData] = useState([]);
    const [assignedDept,setAssignedDept] = useState("");
    const [deptUser,setDeptUser] = useState([]);


        useEffect(()=>{
            fetch("/alldept",{
                method:"get",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
            }).then(res=>res.json())
            .then(data=>{
               // console.log(data.depts[1].name);
                setDeptData(data.depts);
               // console.log(deptData);
            })
    },[])

    const handleDept=(event)=>{
        //console.log(event.target.value);
        setAssignedDept(event.target.value);

        fetch("/alldeptuser",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name:event.target.value
            })
        }).then(res=>res.json())
        .then(data=>{
           // console.log(data.depts[1].name);
           setDeptUser(data);
           //console.log(data);
        })

    }

    const handleUser = (event) =>{
        setAssignedTo(event.target.value);
    }

    const createForm = () =>{

        fetch("/createform",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title:title,
                body:body,
                assignedTo,
                assignedDept
            })
        }).then(res=>res.json())
        .then(data=>{
           //console.log(data);
           if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
         }
         else{
             M.toast({html:"Request Posted",classes:"#43a047 green darken-1"})
             setTitle("");
             setBody("");
         }  
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    return(
        <>
            
        <div className="card input-field"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
        >
        <div className="input-field col s12">
                <select className="browser-default"
                onChange={handleDept}
                value = {assignedDept}
                >
                {
                    
            deptData.map(dept => {
                return (
                    <option key={dept.id} value={dept.name}>
                        {dept.name}
                    </option>
                )
            })
        }
                </select>

                <select style={{marginTop:"30px"}} className="browser-default"
                onChange={handleUser}
                value = {assignedTo}
                >
                {
                    
            deptUser.map(user => {
                return (
                    <option key={user.id} value={user.name}>
                        {user.name}
                    </option>
                )
            })
        }
                </select>

            </div>  

            <input type="text" placeholder="Request title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" placeholder="Message"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            /> 
                                
            
            <button className="btn waves-effect teal darken-1" type="submit" name="action"
            onClick={createForm}
            >Submit
            </button>
        </div>
        </>
    )
}

export default Form