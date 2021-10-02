import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext';
import { getPosts } from '../data/posts';
import DeletePost from './DeletePost';
import { Link } from "react-router-dom";
import edit from '../media/editing.png'


export default function DisplayPost(){

   // const [posts, setPosts] = useState([getPosts()]);

    const { userLogIn } = useContext(UserContext);

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function loadPosts() {
          const currentPosts = await getPosts();
            
          setPosts(currentPosts);
        }
        loadPosts();
      }, [posts]);
      
    if(posts === null){
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
                <span  className="d-flex justify-content-start  align-items-center">
                {/* <img src={handleAvatarImg(x.email)}  height="50px" width="50px" className="rounded-circle"  alt="profileimg" ></img> */}
                <h6>{x.username}</h6>
                </span>
                <span className="d-flex justify-content-between">
                  {x.text}
                </span>

                <div className="p-2 ml-auto">
                { userLogIn.username === x.username ? 
                            <div>
                            <Link to="/editPost">  <img src={edit} className="edit-img" alt="edit-img"></img></Link>
                           <DeletePost postid={x.post_id}/>
                           </div>
                           
                        
                        : null
                }
              </div>
              </div>
            )
        }
      </div>
    );

}