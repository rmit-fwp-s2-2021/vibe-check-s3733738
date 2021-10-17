import React, { useState , useEffect , useContext} from 'react'
import { getUser, getUsers } from '../data/repository';
import { createPost, getPosts, getPostsAndReplies } from '../data/posts';
import DisplayPost from './DisplayPost';
import Connect from './Connect.js';
import { AvatarContext } from "../contexts/AvatarContext";

function Forum() {

  const username = getUser().username;

  const [posts, setPosts] = useState(null);

  const [fields, setFields] = useState({ 
    username: username,
    text: "",
    image_url: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState(null);

  const [ deletePost, setDeletePost ] = useState(false);

  const [ editPost, setEditPost] = useState(false);

  const [ postComment, setPostComment] = useState(false);

  const  { avatarImage }  = useContext(AvatarContext);



  const handleDelete = () => {
    setDeletePost(true);
    return;
  }

  const handleEdit = () => {
    setEditPost(true);
    return;
  }

  const handlePostComment =() =>{
    setPostComment(true);
    return
  }


  useEffect(() => {
    async function loadPosts() {
      // load all posts exist in database 
      const currentPosts = await getPostsAndReplies();
      
      setPosts(currentPosts);

      //load all users
      const users = await getUsers();
      setUsers(users);

      setDeletePost(false);
      setEditPost(false);
      setPostComment(false);
    }
    loadPosts();
  }, [username, deletePost, editPost, postComment]);



  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postTrimmed = fields.text.trim();

    //console.log(postTrimmed);

    //  if textbox field is empty return error
    if (postTrimmed === "") {
      setErrorMessage("Post cannot be empty");
      return;
    }

  
    
    // insert new post in batabase 
    console.log(fields);
    await createPost({...fields, postTrimmed});

    const posts = await getPostsAndReplies();
    setPosts(posts);

    // //set post to localStorage
    // //insertPost(postTrimmed, getUser().email);
    // //make  post field empty
   
    setFields({...fields, text: "", image_url:""});
    setImage("");
    // //clear error message
    setErrorMessage("");

    return;

    
  }

   
   
    const handleFileUpload = async (event) => {
      const files = event.target.files;
      if (files[0]) {
        const data = new FormData();
        data.append("image", files[0]);
        setLoading(true);
         // free image hosting api
        const result = await fetch(
          "https://api.imgbb.com/1/upload?&key=46f55d39151e14d1eefd8420530fb11b",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await result.json();
        const url = file.data.url;
        setImage(url);
        console.log(url);
        setLoading(false);
  
        //SETS THE IMAGE URL TO THE FIELDS
        setFields({
          ...fields,
          image_url : url,
        });
      } else {
        return;
      }
    };



  return (
    <>
    
    <div className="row">
      <div className="col-1">
      </div>
    <div className="col-lg-7 my-3 p-3 justify-content-center align-items-center ">
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Share your thoughts...</legend>
            <div className="form-group">
              <textarea name="text" id="text" className="form-control" rows="3"
                value={fields.text} onChange={handleInputChange} />
            </div>
           
            {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
            <div className="d-flex justify-content-between align-items-center">
             <input type="file" name="file" onChange={handleFileUpload}></input>
                <button type="submit" className="btn btn-primary btn-lg rounded-pill" value="Post">Post</button>
            </div>
      
            {loading ? (
            <p>Image uploading...</p>
          ) : (
            <div className="image-preview text-center my-3">
              <img src={image} className="post-img rounded img-fluid" alt={image}></img>
            </div>
          )}
            
          </fieldset>
        </form>
      </div>
      <hr />
      <h1 className="text-weight-bold">Forum</h1>
          <DisplayPost posts={posts} users={users} handleDelete={handleDelete} handleEdit={handleEdit}  handlePostComment={handlePostComment}/>
    </div>
            
          <div className="col-lg-3">
            <div className="border border-info p-4 text-center">
            <h2>My Profile</h2>
            
                    <img src={avatarImage} alt="Avatar" className="avatar my-3" />
                    <h3> {getUser().username} </h3>
                    <div className="user-info">
                        <p> {getUser().email}</p>
                        <p>joined since</p>
                        <p> {getUser().date}</p>
                    </div>
            </div>

          
          <Connect users={users}/>
          </div>
    </div>
    </>
  )
}

export default Forum
