import React,{useState,useEffect} from "react"

const ApprovalPage=()=>{

    const [pendingRequest,setPendingRequest] = useState([]);
    const [response,setResponse] = useState([]);

    useEffect(()=>{
        fetch("/requestforapproval",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        }).then(res=>res.json())
        .then(data=>{
           // console.log(data);
            setPendingRequest(data);
           //console.log(data);
        })
},[])

const giveResponse = (status,id) =>{
    const resbody = response;
    console.log(response)
    fetch("/setstatus",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },body:JSON.stringify({
            id,
            status,
            resbody
        })
    }).then(res=>res.json())
    .then(result=>{
       console.log(result)
       const newData = pendingRequest.filter(item=>{
        return item._id != result._id
    })
    setPendingRequest(newData)
    const newRes = [];
    setResponse(newRes);
})
}

    return(
        <>
            <div className="card input-field"
        style={{
            margin:"30px auto",
            maxWidth:"600px",
            padding:"20px",
            textAlign:"center"
        }}
            >
                {
                    
                    pendingRequest.map(request => {
                        return ( 

                            <div className="row" key=' request._id'>
                            <div className="col s6" style={{textAlign:"left"}}>
                                Requester : {request.createdBy.name}</div>
                            <div className="col s6" style={{textAlign:"left"}}>Title : {request.title}</div>
                            <div className="col s12" style={{textAlign:"left"}}>Body : {request.body}</div>
                            <div className="col s12" style={{textAlign:"left"}}>
                                <input placeholder={"Response"} onChange={
                                   (e)=> setResponse(e.target.value)}></input>
                            </div>
                            <div className="col s2" style={{textAlign:"left"}}>
                                <button onClick={()=>giveResponse("accepted",request._id)}>Accept</button>
                            </div>
                            <div className="col s2" style={{textAlign:"left"}}>
                                <button onClick={()=>giveResponse("rejected",request._id)}>Reject</button>
                            </div>  
                            </div>

                            
                        )
                    })
                }

            </div>

        </>
    )

}


export default ApprovalPage