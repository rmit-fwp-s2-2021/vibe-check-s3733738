// const POSTS_KEY = "posts";

// //  default posts when component mounts
// const posts = [{ post: "Will Australian borders to be open to International students in 2022", email: "user@test.com" },
// { post: "How do I apply for an extension subject?", email: "user@test.com" },
// { post: "RMIT swiwtching degree from IT to CS", email: "user1@test.com" },
// { post: "Has anyone received any information about the gradution ceremony?", email: "user1@test.com" },
// ];

// //  initialize local storage "posts" with data
// function initPosts() {
//     if (localStorage.getItem(POSTS_KEY !== null)) {
//         return;
//     }
//     //set data into local storag
//     localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
// }

// // add post in local storage "posts"  array
// function insertPost(post, email) {

//     const posts = getPosts();
//     posts.push({ post: post, email: email });
//     localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

// }

// // retrieve all posts in local storage "posts"
// function getPosts() {
//     const posts = localStorage.getItem(POSTS_KEY);
//     return JSON.parse(posts)
// }

// // update post edit by user
// function editPost(postEdited, index) {

//     let posts = getPosts();
//     let i = index;
//     posts[i] = { ...posts[i], post: postEdited };
//     localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

// }

// // delete a post post by a user
// function deletePost(postToDelete) {
//     let posts = getPosts();
//     let index;
//     for (let i = 0; i < posts.length; i++) {
//         if (posts[i].post === postToDelete.post) {
//             index = i;
//             break;
//         }
//     }
//     if (index === undefined) return
//     posts.splice(index, 1);
//     localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
// }

// //  delete all post made by a user once account deleted
// function deleteAllPostByUser(userEmail) {
//     let posts = getPosts();
//     for (const post of posts) {
//         if (post.email === userEmail) {
//             deletePost(post);
//         }
//     }

// }

// export {
//     initPosts,
//     insertPost,
//     getPosts,
//     deletePost,
//     editPost,
//     deleteAllPostByUser,
// }

import axios from "axios";

const API_HOST = "http://localhost:4000";

async function getPost(postId) {
    const response = await axios.get(API_HOST + `/api/posts/select/${postId}`);

    return response.data;
}


async function getPosts() {
    const response = await axios.get(API_HOST + "/api/posts");

    return response.data;
}

// json object is passed to this function 
async function createPost(post){
    const response = await axios.post(API_HOST + "/api/posts", post);

    return response.data;
}

async function editPost(post, post_id) {
 
    const response = await axios.put(API_HOST + `/api/posts/update/${post_id}`, post);
    
    return response.data;
  }

// delete specific post
async function deletePost(postId){
    const response = await axios.delete(API_HOST + `/api/posts/delete/${postId}`);

    return response.data;
}

export {
    getPost, getPosts, createPost, editPost, deletePost
}