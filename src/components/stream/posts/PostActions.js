import axios from "axios";
import { toast } from "react-toastify";
import {
  RETRIEVE_POST_SUBMITTED,
  RETRIEVE_POST_SUCCESS,
  RETRIEVE_POST_ERROR,
  NEW_COMMENT_SUBMITTED,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_ERROR,
  RETRIEVE_COMMENT_LIST_SUBMITTED,
  RETRIEVE_COMMENT_LIST_SUCCESS,
  RETRIEVE_COMMENT_LIST_ERROR,
  UPDATE_RETRIEVED_POST,
  RETRIEVE_POSTLIKE_SUBMITTED,
  RETRIEVE_POSTLIKE_ERROR,
  RETRIEVE_POSTLIKE_SUCCESS,
} from "./PostTypes";
import { setAxiosAuthToken } from "../../../utils/Utils";

export const retrievePost = (authorId, postId, chainFunc=null) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_POST_SUBMITTED });
  axios
    .get("/author/" + authorId + "/posts/" + postId + "/")
    .then((response) => {
      dispatch({ type: RETRIEVE_POST_SUCCESS, payload: response.data });
      if (chainFunc !== null) {
        chainFunc();
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: RETRIEVE_POST_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const createComment = (comment, post, chainFunc=null) => (dispatch, getState) => {
  const commentObj = {};
  const state = getState();
  const author = state.auth.author;

  setAxiosAuthToken(state.auth.token);
  commentObj["author"] = author;
  commentObj["comment"] = comment;
  commentObj["contentType"] = "text/markdown";
  commentObj["post"] = post;
  
  axios
    .post("/author/" + state.auth.author.id + "/posts/" + state.post.retrievedPost.id + "/comments/", commentObj)
    .then((response) => {

      console.log("RESPONSE DONE");
      console.log(response.data);

      if (chainFunc !== null) {
        chainFunc();
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const retrieveCommentList = (authorId, postId) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_COMMENT_LIST_SUBMITTED });
  axios
    .get("/author/" + authorId + "/posts/" + postId + "/comments/")
    .then((response) => {
      dispatch({ type: RETRIEVE_COMMENT_LIST_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: RETRIEVE_COMMENT_LIST_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const sendCommentQuery = (post, page, size, setter) => (dispatch, getState) => {
  // this function doesnt dispatch action
  // no global state for comment
  // it does the query, return result to setter
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  axios
    .get("/author/" + post.author.id + "/posts/" + post.id + "/comments/" + "?" + "page=" + page + "&" + "size=" + size)
    .then((response) => {
      // call setter
      setter(response.data);
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response));
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
}

export const updateRetrivedPost = (newPost) => (dispatch) => {
  dispatch({type: UPDATE_RETRIEVED_POST, payload: newPost});
}


export const checkInboxPostValid = (inboxPost, responseHandler) => (dispatch, getState) => {
  // basically same as 
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  axios
    .get("/author/" + inboxPost.author.id + "/posts/" + inboxPost.id + "/")
    .then((response) => {
      // post exist, grab the nestest
      // console.log("Called");
      responseHandler(response.data);
    })
    .catch((error) => {
      // dead post
      responseHandler(null);    // indicating this post is dead
    });
}


export const retrievePostLikes = (post, setterFunction) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  axios
    .get("/author/" + post.author.id + "/posts/" + post.id + "/likes/")
    .then((response) => {
      // debug
      // console.log("retrievePostLikes - response data: ");
      // console.log(post);
      // console.log(response.data);
      setterFunction(response.data);

    })
    .catch((error) => {
      if (error.response) {

        // handles specific status code
        switch (error.response.status) {
          case 404:
            break;
          case 401:
            // too deep in the rabbit hole
            // like polling is handled by post.jsx
            // if 401 happends, then we just ignore it, this error will eventually cought by navigationbar
            // and redirect user to login.
            break;
          default:
            toast.error(JSON.stringify(error.response.data));
            break;
        }
        dispatch({
          type: RETRIEVE_POSTLIKE_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
}

export const likeComment = (post, comment, chainFunc=null) => (dispatch, getState) => {
  const state = getState();
  const requestAuthor = state.auth.author;

  const commentLike = {
    type: "like",
    author: {
      ...requestAuthor,
      type: "author",
      id: requestAuthor.id,
      url: requestAuthor.host + "api/author/" + requestAuthor.id,
    },
    object: post.author.host + "api/author/" + post.author.id + "/posts/" + post.id + "/comments/" + comment.id + "/",
    host: post.author.host,
  }

  setAxiosAuthToken(state.auth.token);
  axios
  .post("/author/" + post.author.id + "/inbox/", commentLike)
    .then((response) => {
      chainFunc();
    })
    .catch((error) => {
      if (error.response) {

        // handles specific status code
        switch (error.response.status) {
          case 409:
            toast.error("You already liked this comment");
            break;
          case 404:
            break;
          case 401:
            // too deep in the rabbit hole
            // like polling is handled by post.jsx
            // if 401 happends, then we just ignore it, this error will eventually cought by navigationbar
            // and redirect user to login.
            break;
          default:
            toast.error(JSON.stringify(error.response.data));
            break;
        }
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
}

export const retrieveCommentLikes = (comment, setter) => (dispatch, getState) => {
  const state = getState();

  const requestAuthor = state.auth.author;

  setAxiosAuthToken(state.auth.token);
  axios
    .get("/author/" + requestAuthor.id + "/posts/" + comment.post + "/comments/" + comment.id + "/likes/")
    .then((response) => {
      console.log("THIS");
      console.log(response.data);
      setter(response.data);
    })
    .catch((error) => {
      if (error.response) {
        // handles specific status code
        switch (error.response.status) {
          case 404:
            break;
          case 401:
            // too deep in the rabbit hole
            // like polling is handled by post.jsx
            // if 401 happends, then we just ignore it, this error will eventually cought by navigationbar
            // and redirect user to login.
            break;
          default:
            toast.error(JSON.stringify(error.response.data));
            break;
        }
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
}