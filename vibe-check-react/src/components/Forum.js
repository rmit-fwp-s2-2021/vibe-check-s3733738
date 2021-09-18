// import React, { useState } from 'react'
// import { getUser, getUsers } from '../data/repository';
// import { getPosts, insertPost } from '../data/posts';

// function Forum() {

//   const [post, setPost] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   const [posts, setPosts] = useState(getPosts());

//   const handleInputChange = (event) => {
//     setPost(event.target.value);
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const postTrimmed = post.trim();

//     //  if textbox field is empty return error
//     if (postTrimmed === "") {
//       setErrorMessage("Post cannot be empty");
//       return;
//     }

//     //create post
//     setPosts([...posts, { email: getUser().email, post: postTrimmed }]);
//     //set post to localStorage
//     insertPost(postTrimmed, getUser().email);
//     //make  post field empty
//     setPost("");
//     //clear error message
//     setErrorMessage("");

//   }

//   // convert email to username
//   const handleEmailtoUser = (email) => {
//     const users = getUsers();
//     //loop users in the localStorage
//     for (const user of users) {
//       if (email === user.email) {
//         //return username
//         return user.username;
//       }
//     }
//   }

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


//   return (
//     <div className="col-lg-8 my-3 p-3 justify-content-center align-items-center ">
//       <div>
//         <form onSubmit={handleSubmit}>
//           <fieldset>
//             <legend>New Post</legend>
//             <div className="form-group">
//               <textarea name="post" id="post" className="form-control" rows="3"
//                 value={post} onChange={handleInputChange} />
//             </div>
//             {errorMessage !== null &&
//               <div className="form-group">
//                 <span className="text-danger">{errorMessage}</span>
//               </div>
//             }
//             <div className="form-group">
//               <input type="button" className="btn btn-danger mr-5" value="Cancel"
//                 onClick={() => { setPost(""); setErrorMessage(null); }} />
//               <input type="submit" className="btn btn-primary" value="Post" />
//             </div>
//           </fieldset>
//         </form>
//       </div>
//       <hr />
//       <h1>Forum</h1>
//       <div>
//         {
//           posts.length === 0 ?
//             <span className="text-muted">No posts have been submitted.</span>
//             :
//             posts.map((x) =>
//               <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
//                 <span  className="d-flex justify-content-start  align-items-center">
//                 <img src={handleAvatarImg(x.email)}  height="50px" width="50px" className="rounded-circle"  alt="profileimg" ></img>
//                 <h6>{handleEmailtoUser(x.email)}</h6>
//                 </span>
//                 <span className="d-flex justify-content-between">
//                   {x.post}
//                 </span>

//               </div>
//             )
//         }
//       </div>
//     </div>
//   )
// }

// export default Forum
