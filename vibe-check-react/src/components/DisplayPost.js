import React, { useState, useEffect } from 'react'
import { getUser } from '../data/repository';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import Reply from './Reply';
import LikeDislike from './LikeDislike';
import { getUserLikedPost, getUserDislikedPost } from '../data/posts';
import Avatar from './Avatar';
import replyIcon from '../media/reply.png';

export default function DisplayPost({ posts, users, handleDelete, handleEdit, handlePostComment }) {

  const currentUser = getUser().username;

  const [userLiked, setUserLiked] = useState(null);

  const [userDisliked, setUserDisliked] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    if (showForm == false) {
      setShowForm(true);
    }
    else {
      setShowForm(false);
    }
  }




  useEffect(() => {
    async function loadLikedDisliked() {

      const likedPost = await getUserLikedPost(currentUser);
      setUserLiked(likedPost);
      console.log("user liked post:" + likedPost);

      const dislikedPost = await getUserDislikedPost(currentUser);
      setUserDisliked(dislikedPost);
      console.log("user disliked post:" + dislikedPost);


      return;

    }
    loadLikedDisliked();
  }, [currentUser]);

  if (posts === null) {
    return null
  }

  return (

    <div>
      {
        // IF NO POST SUBMITTED IN THE FORUM  DISPLAY 
        posts.length === 0 ?
          <span className="text-muted">No posts have been submitted.</span>
          :
          posts.map((x) =>
            <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
              <span className="d-flex align-items-center p-3">
                <div className="my-6 " >
                  {users &&
                    <Avatar username={x.username} users={users} />
                  }
                </div>
                <h6>{x.username}</h6>
                <div className="p-2 ml-auto">

                  {/* DISPLAY EDIT/DELETE IF POST BELONGS TO USER */}

                  {getUser().username === x.username ?
                    <div className="row">
                      <div className="col-1">
                        <EditPost postid={x.post_id} handleEdit={handleEdit} />
                      </div>
                      <div className="col">
                        <DeletePost postid={x.post_id} handleDelete={handleDelete} />
                      </div>
                    </div>

                    : null
                  }
                </div>

              </span>

              {/* DISPLAY CONTEXT OF THE POST */}

              <span className="d-flex justify-content-between">
                {x.text}
                {x.image_path !== null &&
                  <div className="image-post">
                    <img src={x.image_path} className="post-img rounded img-fluid" alt={x.image_path}></img>
                  </div>
                }

              </span>
              <div className="d-flex justify-content-start align-items-center">
                <LikeDislike postid={x.post_id} userLiked={userLiked} userDisliked={userDisliked} />
                <div className="col-1">
                  <img src={replyIcon} className="reply-img" alt="reply-img" onClick={handleClick}></img>
                  <p>
                    Reply
                  </p>
                </div>

              </div>
              <Reply postid={x.post_id} handlePostComment={handlePostComment} showForm={showForm} />

              {/* DISPLAY REPLIES ON POST */}

              {posts.comments !== 0 &&
                <div className="border my-3 p-3">
                  <span className="d-flex-col justify-content-start  align-items-center">
                    <p>Replies:</p>
                    {x.comments.map((r) => {
                      return (
                        <>

                          <div className="row p-2 my-3 align-items-center">
                            <Avatar username={r.comment_author} users={users} />
                            <h6>{r.comment_author}</h6>
                          </div>
                          {r.message}
                          {r.image_path !== null &&
                          <div className="image-post">
                            <img src={r.image_path} className="post-img rounded img-fluid" alt={r.image_path}></img>
                          </div>
                        }

                        </>
                      );
                    })}
                  </span>
                </div>



              }
            </div>
          )
      }
    </div>
  );

}