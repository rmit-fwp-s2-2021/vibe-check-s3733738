import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../contexts/UserContext";

function Reply(){

    const { userLogIn } = UserContext;
    const [ replies, setReplies ] = useState([]);

    const [fields, setFields] = useState({
        message: "",
        reply_author: userLogIn,
        

        
    })

    return (

        <>
        <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
            <span  className="d-flex justify-content-start  align-items-center">
                    <span>
                    <h6>{post.username}</h6>
                    </span>
                    </span>
                    <span className="d-flex justify-content-between">
                    {post.text}
            </span>

        </div>
        </>
    );

}