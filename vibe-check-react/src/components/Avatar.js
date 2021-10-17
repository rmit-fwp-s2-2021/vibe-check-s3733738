import React,{useState, useEffect} from 'react'

const Avatar = ({ username, users }) => {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() =>{
        if (users !== null) {
            users.forEach((user) => {
              if (username === user.username) {
                setImageUrl(user.image_path);
              }
             
            });
          }
    },[username]);
      

    return (
        <div className="mr-3">
             <img src={imageUrl} height="50px" width="50px" margin="10px" className="rounded-circle" alt="profileimg" ></img>
        </div>
    )
}

export default Avatar
