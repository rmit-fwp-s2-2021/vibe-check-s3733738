import React, { useState, useEffect } from 'react';
import { getFollowing, getUser } from '../data/repository';
import { FollowingButton } from './FollowButton';

// LIST THE USERS FOLLOWED BY LOGGED IN USER IN PROFILE PAGE
const FollowingList = () => {
    const [following, setFollowing] = useState(null);

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
                                    < FollowingButton user={user.following_name} />
                                </span>
                            </li>
                        )
                }

            </ul>
        </div>
    )
}

export default FollowingList
