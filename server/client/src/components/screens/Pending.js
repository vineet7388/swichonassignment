import React,{useState,useEffect} from "react"

const PendingForm=()=>{

    const [pendingRequest,setPendingRequest] = useState([]);

    useEffect(()=>{
        fetch("/pendingrequest",{
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
                            <div className="col s6" style={{textAlign:"left"}}>Title : {request.title}</div>
                            <div className="col s6" style={{textAlign:"left"}}>Body : {request.body}</div> 
                            </div>
                        )
                    })
                }

            </div>

        </>
    )

}


export default PendingForm   