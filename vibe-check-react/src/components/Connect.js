import React, { useState, useEffect } from 'react';
import { getFollowable, getUser, follow } from '../data/repository';
import { FollowButton } from './FollowButton';
import Avatar from './Avatar';
import '../style/Forum.css';


const Connect = ({ users }) => {


    const [connect, setConnect] = useState(null);

    useEffect(() => {
        async function loadConnect() {
            try {
                // load follwable  from database
                const currentConnect = await getFollowable(getUser().username);
                //const following = await getFollowing(getUser().username);
                setConnect(currentConnect);
                //setFollowing(following);
                return;
            } catch (err) {
                console.log(err);
                return;
            }
        }
        loadConnect();
    }, []);


    return (
        <div className="connect">
            <br />
            <h2 className="border-bottom text-center p-3">Connect</h2>
            <ul className="list-group">
                {
                    connect == null ?
                        <span className="text-muted">No one to connect.</span>
                        :
                        connect.map((user) =>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                                <div className="follow col-6 d-flex align-items-center">
                                    <Avatar username={user} users={users} />
                                    <h6>{user}</h6>
                                </div>

                                <span>
                                    <FollowButton user={user} />
                                </span>

                            </li>
                        )

                }




            </ul>





        </div>
    )
}

export default Connect
