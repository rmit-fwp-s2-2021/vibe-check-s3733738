import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext';
import { getUser } from '../data/repository';
import { createReply, getPosts } from '../data/posts';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import Reply  from './Reply';
import LikeDislike from './LikeDislike';


export default function DisplayPost(props) {


  // const [replyFields, setReplyFields ] = useState({message: "", reply_author: getUser().username, post_id: ""});

  // const [errorMessage, setErrorMessage] = useState("");




  // const handleInputChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   const temp = { ...replyFields };
  //   temp[name] = value;
  //   setReplyFields(temp);
  // };

  const posts = props.posts;

  if (posts === null) {
    return null
  }

  // const replyForm =() => {
  //   setReplyFields({... replyFields, post_id: props.postid});
  //   console.log(replyFields);

  //   return (
  //     <div className="col">
  //     <form onSubmit={handleReplySubmit}>
  //         <fieldset>
  //         <div className="form-group">
  //             <textarea name="message" id="message" className="form-control" rows="3"
  //               value={replyFields.message} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <input type="submit" className="btn btn-primary" value="Post" />
  //           </div>
  //         </fieldset>
  //     </form>
  //     </div>
  //   );
   
  // } 

  // const handleReplySubmit = async(event) =>{
  //   event.preventDefault();

  //   const postTrimmed = replyFields.message.trim();

  //   //  if textbox field is empty return error
  //   if (postTrimmed === "") {
  //     setErrorMessage("Post cannot be empty");
  //     return;
  //   }

  //   // insert new comment in database
  //   await createReply({...replyFields, postTrimmed});

  //   // //make  post field empty
  //   setReplyFields({...replyFields, message: ""});
  //   // //clear error message
  //   setErrorMessage("");

  //   return;

  // }

  return (

    <div>
      {
        // IF NO POST SUBMITTED IN THE FORUM  DISPLAY 
        posts.length === 0 ?
          <span className="text-muted">No posts have been submitted.</span>
          :


          posts.map((x) =>
            <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
              <span className="d-flex justify-content-start  align-items-center">
                {/* <img src={handleAvatarImg(x.email)}  height="50px" width="50px" className="rounded-circle"  alt="profileimg" ></img> */}
                <h6>{x.username}</h6>
                <div className="p-2 ml-auto">

                  {/* DISPLAY EDIT/DELETE IF POST BELONGS TO USER */}

                  {getUser().username === x.username ?
                    <div className="row">
                      <div className="col-1">
                        <EditPost postid={x.post_id} />
                      </div>
                      <div className="col">
                        <DeletePost postid={x.post_id} />
                      </div>
                    </div>

                    : null
                  }
                </div>

              </span>

              {/* DISPLAY CONTEXT OF THE POST */}

              <span className="d-flex justify-content-between">
                {x.text}
              </span>
              {/* <button className="btn btn-default" onClick={replyForm} postid={x.post_id}>
                <p className="mb-0">
                  <i className="fas fa-reply"></i>Reply
                </p>
              </button> */}
              <span className="d-flex justify-content-start">
                <LikeDislike postid={x.post_id}/>
                <Reply postid={x.post_id} />
              </span>
              
              {/* DISPLAY REPLIES ON POST */}

              {posts.comments !== 0 ?
                <div className="border my-3 p-3">
                  <span className="d-flex-col justify-content-start  align-items-center">
                    <p>Replies:</p>
                    {x.comments.map((r) => {
                      return (
                        <>
                          <div className="row p-2 my-3">
                            <h6>{r.comment_author}</h6>
                          </div>

                          {r.message}


                        </>
                      );
                    })}
                  </span>
                </div>
                : null

              }


            </div>
          )
      }
    </div>
  );

}