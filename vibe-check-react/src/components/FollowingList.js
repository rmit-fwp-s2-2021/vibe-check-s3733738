import React,{ useState, useEffect }  from 'react';
import { getFollowing, getFollowable, getUser, unfollow } from '../data/repository';

const FollowingList = () => {
    const [following, setFollowing] = useState(null);
    const [ button, setButton] = useState("Following");

    useEffect(() => {
        async function loadConnect() {
            try {
                // load follwong from database
                const following = await getFollowing(getUser().username);
                setFollowing(following);
                console.log("component mounted");
                return;
            } catch (err) {
                console.log(err);
                return;
            }
        }
        loadConnect();
    }, []);

    async function handleUnfollow(following){
        await unfollow(getUser().username, following);
        setButton("Follow");
        return;
    }


    return (
        <div className="col-xl-3 my-3 p-3 bg-light">

            <h3>Following</h3>

            <ul className="list-group">
                {
                    following == null ?
                        <span className="text-muted">No one to connect.</span>
                        :
                        following.map((user) =>
                            <li className="list-group-item d-flex justify-content-between align-items center">

                                <h6>{user.following_name}</h6>
                                <span>
                                    <button className="btn btn-primary rounded-pill" onClick={()=>{handleUnfollow(user.following_name)}}>
                                        {button}
                                    </button>
                                </span>

                            </li>
                        )

                }

            </ul>

        </div>
    )
}

export default FollowingList
