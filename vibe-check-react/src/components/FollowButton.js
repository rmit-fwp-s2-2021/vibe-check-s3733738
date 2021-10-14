import React,{ useState}  from 'react';
import { getUser , follow ,unfollow} from '../data/repository';

// DISPLAY FOLLOW OR FOLLOWING BUTTON
const FollowButton = ({user}) => {
    const [ button, setButton] = useState("Follow");

    async function handleFollow(followUser){

        if( button === "Follow"){
            const targetUser ={ "targetUser": followUser};
            await follow(getUser().username, targetUser);
            setButton("Following");
            return;
        }
        else{
            await unfollow(getUser().username, followUser);
            setButton("Follow");
            return;
        }
        
    }
    
    return (
        <div>
            <button className="btn btn-outline-primary rounded-pill" onClick={()=> handleFollow(user) }>{button}</button>
        </div>
    )
}

const FollowingButton = ({user}) => {
    const [ button, setButton] = useState("Following");

    async function handleUnfollow(following){
        if( button === "Following"){
            await unfollow(getUser().username, following);
            setButton("Follow");
            return;
        }
        else{
            const targetUser ={ "targetUser": following};
            await follow(getUser().username, targetUser )
            setButton("Following");
            return;
        }
       
    }

    
    return (
        <div>
            <button className="btn btn-primary rounded-pill" onClick={()=> handleUnfollow(user) }>{button}</button>
        </div>
    )
}

export { FollowButton, FollowingButton}
