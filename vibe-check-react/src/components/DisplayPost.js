import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext';
import { getUser } from '../data/repository';
import { getPosts } from '../data/posts';
import DeletePost from './DeletePost';
import EditPost from './EditPost';

export default function DisplayPost(props) {

  const { userLogIn } = useContext(UserContext);


  const posts = props.posts;

  if (posts === null) {
    return null
  }

  return (

    <div>
      {
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
                      <EditPost postid={x.post_id}/>
                    </div>
                    <div className="col">
                    <DeletePost postid={x.post_id}/>
                    </div>
                  </div>


                  : null
                }
              </div>

              </span>
              <span className="d-flex justify-content-between">
                {x.text}
              </span>

             
            </div>
          )
      }
    </div>
  );

}