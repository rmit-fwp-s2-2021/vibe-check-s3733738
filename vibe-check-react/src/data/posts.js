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
async function createPost(post) {
    const response = await axios.post(API_HOST + "/api/posts", post);

    return response.data;
}

async function editPost(post, post_id) {

    const response = await axios.put(API_HOST + `/api/posts/update/${post_id}`, post);

    return response.data;
}

// delete specific post
async function deletePost(postId) {
    const response = await axios.delete(API_HOST + `/api/posts/delete/${postId}`);

    return response.data;
}


// get 'forum' which contains posts and comments in one query 
async function getPostsAndReplies() {
    const response = await axios.get(API_HOST + "/api/forum");

    return response.data;

}

async function createReply(comment) {
    const response = await axios.post(API_HOST + "/api/comments", comment);

    return response.data;
}



async function getLikeCount(post_id) {
    const response = await axios.get(API_HOST + `/api/like/getLikeCount/${post_id}`);

    return response.data;
}

async function getDislikeCount(post_id) {
    const response = await axios.get(API_HOST + `/api/like/getDislikeCount/${post_id}`);

    return response.data;
}

async function getUserLikedPost(username) {
    const response = await axios.get(API_HOST + `/api/like/getUserLikedPost/${username}`);

    return response.data;

}

async function getUserDislikedPost(username) {
    const response = await axios.get(API_HOST + `/api/like/getUserDislikedPost/${username}`);

    return response.data;

}

async function likeOrDislikePost(username, post) {
    const response = await axios.post(API_HOST + `/api/like/likeDislike/${username}`, post);

    return response.data;

}

async function deleteLikeOrDislike(username, post) {
    const response = await axios.delete(API_HOST + `/api/like/delete/${username}`, post);

    return response.data;

}




export {
    getPost,
    getPosts,
    createPost,
    editPost,
    deletePost,
    getPostsAndReplies,
    createReply,


    getLikeCount,
    getDislikeCount,
    getUserLikedPost,
    getUserDislikedPost,
    likeOrDislikePost,
    deleteLikeOrDislike


}