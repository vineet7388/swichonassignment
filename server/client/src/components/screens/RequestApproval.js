import React,{useState,useEffect} from "react"

const RequestApprovalForm=()=>{

    const [pendingRequest,setPendingRequest] = useState([]);

    useEffect(()=>{
        fetch("allpendingrequest",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        }).then(res=>res.json())
        .then(data=>{
            setPendingRequest(data);
           //console.log(data);
        })
},[])

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
                            <div className="col s3" style={{textAlign:"left" }}>Assigned To: {request.assignedTo.name}</div>
                            <div className="col s3" style={{textAlign:"left"}}>Requestor : {request.createdBy.name}</div>
                            <div className="col s3" style={{textAlign:"left"}}>Title : {request.title}</div>
                            <div className="col s3" style={{textAlign:"left"}}>Body : {request.body}</div> 
                            </div>
                        )
                    })
                }

            </div>

        </>
    )

}


export default RequestApprovalForm   