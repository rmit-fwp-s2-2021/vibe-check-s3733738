import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { getUser } from '../data/repository';
import { createReply, getPosts } from '../data/posts';

export default function Reply(props) {

    const postid = props.postid;

    console.log({ postid });

    const [showForm, setShowForm] = useState(false);

    const [replyFields, setReplyFields] = useState({ message: "", reply_author: getUser().username, post_id: postid });

    const [errorMessage, setErrorMessage] = useState("");


    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const temp = { ...replyFields };
        temp[name] = value;
        setReplyFields(temp);
    };

    const handleReplySubmit = async (event) => {
        event.preventDefault();

        const postTrimmed = replyFields.message.trim();

        //  if textbox field is empty return error
        if (postTrimmed === "") {
            setErrorMessage("Post cannot be empty");
            return;
        }

        // insert new comment in database
        await createReply({ ...replyFields, message: postTrimmed });

        // //make  post field empty
        setReplyFields({ ...replyFields, message: "" });
        // //clear error message
        setErrorMessage("");

        return;

    }

    const handleClick=()=>{
        if(showForm == false){
            setShowForm(true);
        }
        else{
            setShowForm(false);
        }
    }


    return (

        <>
            <button className="btn btn-default" onClick={handleClick}>
                <p className="mb-0">
                    <i className="fas fa-reply"></i>Reply
                </p>
            </button>
            {showForm == true &&

                <div className="col p-2">
                    <form onSubmit={handleReplySubmit}>
                        <fieldset>
                            <div className="form-group">
                                <textarea name="message" id="message" className="form-control" rows="3"
                                    value={replyFields.message} onChange={handleInputChange} />
                            </div>
                            {errorMessage !== null &&
                                <div className="form-group">
                                    <span className="text-danger">{errorMessage}</span>
                                </div>
                            }
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary" value="Post" />
                            </div>
                        </fieldset>
                    </form>
                </div>
            }


        </>
    );

}