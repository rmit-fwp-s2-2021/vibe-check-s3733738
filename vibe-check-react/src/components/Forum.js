import React, { useState , useEffect } from 'react'
import { getUser, getUsers } from '../data/repository';
import { createPost, getPosts } from '../data/posts';
import DisplayPost from './DisplayPost';

function Forum() {

  const [posts, setPosts] = useState(null);

  const [fields, setFields] = useState({ 
    username: getUser().username,
    text: "",
    //image_url: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [files, setFiles] = useState([]); 

  const [image64String, setImage64String] = useState("");


  useEffect(() => {
    async function loadPosts() {
      // load all posts exist in database 
      const currentPosts = await getPosts();
      
      setPosts(currentPosts);
    }
    loadPosts();
  }, []);



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

    // const formData = new FormData();
    // formData.append("text", fields.texttext);
    // formData.append("username", getUser().username);
    // formData.append('image_url', post.file);

    //create post
    //setPosts({ username: getUser().email, post: postTrimmed });
    await createPost({...fields, postTrimmed});

    const posts = await getPosts();
    setPosts(posts);

    // //set post to localStorage
    // //insertPost(postTrimmed, getUser().email);
    // //make  post field empty
    setFields({...fields, text: ""});
    // //clear error message
    setErrorMessage("");

    return;

    
  }


//   const handleAvatarImg  = (email) =>{
//     const users = getUsers();
//     //loop users in the localStorage
//     for (const user of users) {
//       if (email === user.email) {
//         //return profileImg
//         return user.profileImg;
//       }
//     }
//   }

const handleFileUpload = (event) => {
    // encode images from local file system 

    setFiles(event.target.files);
    let file = event.target.files[0];
    // image constructor 
    const image = new Image();

    // encode the file using FileReader API
    const reader = new FileReader();
    // if file exist
    if (file){
      // reader information in the file object
      reader.readAsDataURL(file);
      //set the result and store into image64String
      reader.onload = () => {
        var base64 = reader.result;
        console.log(base64);
        setImage64String(base64);
      }
      reader.onerror = (error) => {
        console.log("error", error)
      }
    }
  };
    // if( files[0]?.file) {
    //   // assign image url to image
    //   image.src = URL.createObjectURL(files[0]?.file);
    //   toBase64(files[0]?.file).then((r) => {
    //     setImage(r);
    //   });
    
    // } else {
    //   setImage(null);
    // }



  return (
    <div className="col-lg-8 my-3 p-3 justify-content-center align-items-center ">
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>New Post</legend>
            <div className="form-group">
              <textarea name="text" id="text" className="form-control" rows="3"
                value={fields.text} onChange={handleInputChange} />
            </div>
            <div>
                <p>Upload image</p>
                <input type="file" name="file" onChange={handleFileUpload}></input>
            </div>
            {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
            <div className="form-group">
              <input type="button" className="btn btn-danger mr-5" value="Cancel"
                onClick={() => { setFields({text: ""}); setErrorMessage(null); }} />
              <input type="submit" className="btn btn-primary" value="Post" />
            </div>
          </fieldset>
        </form>
      </div>
      <hr />
      <h1>Forum</h1>
          <DisplayPost posts={posts}/>
    </div>
  )
}

export default Forum
