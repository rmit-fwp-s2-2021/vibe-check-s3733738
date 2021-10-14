import React,{ useState, useEffect }  from 'react';
import { getFollowable, getUser , follow } from '../data/repository';
import { FollowButton } from './FollowButton';

const Connect = (props) => {

    
    const [ connect, setConnect ] = useState(null);
    //const [ button, setButton] = useState("Follow");

    
    useEffect(() => {
        async function loadConnect(){
                try{    
                    // load follwable  from database
                    const currentConnect = await getFollowable(getUser().username); 
                    //const following = await getFollowing(getUser().username);
                    setConnect(currentConnect);
                    //setFollowing(following);
                    console.log("component mounted");
                    return;
                } catch (err) {
                    console.log(err);
                    return;
                } 
            }
        loadConnect();
    }, []);


    //console.log(connect);

    // console.log(connect);
    //console.log(following);

    
    // setUpConnect();

    // async function setUpConnect() {
    //     const currentConnect = await getFollowable(getUser().username);
    //     setConnect(currentConnect);
    // };
    
    // console.log(connect);
   
    

    // async function handleFollow(followUser){
    //     const targetUser ={ "targetUser": followUser};
    //     await follow(getUser().username, targetUser);
    //     setButton("Following");
    //     return;
    // }


    // const handleFollowStatus=(username)=>{
    //    following.map((user)=>{

    //         if (user.following_name === username){
    //             console.log("debug");
    //             setFollow("following");
    //         }
    //         else{ 
    //             return follow;
    //         }
        
    //    })
           
    // };
    


    return (
        <div className="col-lg-3">
            <h3>Connect</h3>
            <ul className="list-group">
                {
                    connect == null ?
                    <span className="text-muted">No one to connect.</span>
                    :
                    connect.map((user) =>
                     <li className="list-group-item d-flex justify-content-between align-items center border-0">
                     
                         <h6>{user}</h6>
                         <span>

                             < FollowButton user={user}/>
                         
                         </span>
                        
                     </li>
                )

                }

            
                
               
            </ul>

            
            

            
        </div>
    )
}

export default Connect
