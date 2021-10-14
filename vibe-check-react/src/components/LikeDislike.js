import React, { useEffect, useState, useRef } from 'react';
import { getUser } from '../data/repository';
import like from '../media/like.png';
import dislike from '../media/dislike.png';
import { getLikeCount, getDislikeCount, getUserLikedPost, getUserDislikedPost, likeOrDislikePost, deleteLikeOrDislike } from '../data/posts';

// LIKE AND DISLIKE COUNT AND BUTTON
const LikeDislike = ({ postid, userLiked, userDisliked }) => {

    const username = getUser().username;

    const [likeCount, setLikeCount] = useState(0);

    const [dislikeCount, setDislikeCount] = useState(0);

    // const [ userLiked, setUserLiked ]= useState(null);

    // const [ userDisliked, setUserDisliked ]= useState(null);

    const [likeButton, setLikeButton] = useState(false);

    const [dislikeButton, setDislikeButton] = useState(false);

    const likeElement = useRef(null);

    const dislikeElement = useRef(null);



    useEffect(() => {
        async function loadLikesDislike() {
            try {
                // load likes from database
                const likes = await getLikeCount(postid);
                setLikeCount(likes);

                const dislikes = await getDislikeCount(postid);
                setDislikeCount(dislikes);

                if (userLiked !== null) {
                    userLiked.map(post => {
                        if (post == postid) {
                            setLikeButton(true);
                            likeElement.current.style.opacity = "1.0";
                        }
                    });
                }

                if (userDisliked !== null) {
                    userDisliked.map(post => {
                        if (postid == post) {
                            setDislikeButton(true);
                            dislikeElement.current.style.opacity = "1.0";
                        }
                    });
                }


                console.log("likes mounted");
                return;
            } catch (err) {
                console.log(err);
                return;
            }
        }
        loadLikesDislike();
    }, [likeButton, dislikeButton]);





    const handleLikeClick = async (event) => {
        event.preventDefault();

        // if the person press on the previous liked like button, delete the record 
        if (likeButton == true) {

            await deleteLikeOrDislike(username, postid);
            setLikeButton(false);
            likeElement.current.style.opacity = "0.4";
            return;
        }
        else {
            const post = { post_id: postid, like: true };
            await likeOrDislikePost(username, post);
            setLikeButton(true);
            likeElement.current.style.opacity = "1.0";
            return;

        }
    }

    const handleDislikeClick = async (event) => {
        event.preventDefault();
        // if the person press on the previous liked like button, delete the record 
        if (dislikeButton == true) {

            await deleteLikeOrDislike(username, postid);
            setDislikeButton(false);
            dislikeElement.current.style.opacity = "0.4";
            return;
        }
        else {
            const post = { post_id: postid, like: false };
            await likeOrDislikePost(username, post);
            setDislikeButton(true);
            dislikeElement.current.style.opacity = "1.0";
            return;

        }
    }

    return (
        <>
            <div className="col-1">
                <img src={like} className="like-img" alt="like-img" onClick={handleLikeClick} ref={likeElement}></img>
                <p>{likeCount}</p>
            </div>
            <div className="col-1">
                <img src={dislike} className="dislike-img" alt="dislike-img" onClick={handleDislikeClick} ref={dislikeElement}></img>
                <p>{dislikeCount}</p>
            </div>
        </>
    );
}

export default LikeDislike
