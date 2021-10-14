import React, { useEffect, useState } from 'react';
import like from '../media/like.png';
import dislike from '../media/dislike.png';
import { getLikeCount, getDislikeCount } from '../data/posts';

// LIKE AND DISLIKE COUNT AND BUTTON
const LikeDislike = ({ postid }) => {

    const [ likeCount, setLikeCount ]= useState(0);
    const [ dislikeCount, setDislikeCount ] = useState(0);

    useEffect(() => {
        async function loadLikesDislike() {
            try {
                // load likes from database
                const likes = await getLikeCount(postid);
                console.log("likes:"+ likes);
                setLikeCount(likes);
                const dislikes = await getDislikeCount(postid);
                setDislikeCount(dislikes);
                console.log("likes mounted");
                return;
            } catch (err) {
                console.log(err);
                return;
            }
        }
        loadLikesDislike();
    }, []);
    

    return (
      <>
            <div className="col-1">
             <img src={like} className="like-img" alt="like-img"></img>
             <p>{ likeCount }</p>
             </div>
             <div className="col-1">
             <img src={dislike} className="dislike-img" alt="dislike-img" ></img>
             <p>{ dislikeCount}</p>
             </div>
       </>
    );
}

export default LikeDislike
