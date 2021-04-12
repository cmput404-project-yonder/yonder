import axios from "axios";
import { toast } from "react-toastify";
import {
  NEW_POST_ERROR,
  NEW_POST_SUBMITTED,
  NEW_POST_SUCCESS,
  EDIT_POST_SUBMITTED,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUBMITTED,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,

  RETRIEVE_POSTS_SUBMITTED,
  RETRIEVE_POSTS_SUCCESS,
  RETRIEVE_POSTS_ERROR,

  LIKE_POST_SUBMITTED,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  SHARE_POST_ERROR,
  SHARE_POST_SUBMITTED,
  SHARE_POST_SUCCESS,
} from "./StreamTypes";
import { setAxiosAuthToken, isEmpty } from "../../utils/Utils";
import { push } from "connected-react-router";


export const sharePost = (newPost, chainFuc=null) => (dispatch, getState) => {
  /*
  NOTICE: change this before part2 deadline
  for now, sharePost will treat the post as new, and do the samething as createPost.
  source and origin, will be handled by backend
  backend support should be ready before demo March 31st
  */
  const state = getState();
  setAxiosAuthToken(state.auth.token);

  newPost["author"] = state.auth.author;

  dispatch({ type: SHARE_POST_SUBMITTED });
  axios
    .post("/author/" + state.auth.author.id + "/posts/", newPost)
    .then((response) => {
      dispatch({ type: SHARE_POST_SUCCESS, payload: response.data });
      if (chainFuc !== null) {
        chainFuc();
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: SHARE_POST_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const createPost = (newPost) => (dispatch, getState) => {
  const state = getState();
  setAxiosAuthToken(state.auth.token);

  newPost["author"] = state.auth.author;
  console.log("newpost:",newPost);

  dispatch({ type: NEW_POST_SUBMITTED });
  axios
    .post("/author/" + state.auth.author.id + "/posts/", newPost)
    .then((response) => {
      dispatch({ type: NEW_POST_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: NEW_POST_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const updatePost = (editedPost, setter=null) => (dispatch, getState) => {
  const state = getState();
  const author = state.auth;

  setAxiosAuthToken(getState().auth.token);
  dispatch({ type: EDIT_POST_SUBMITTED });
  console.log(editedPost);
  axios
    .put("/author/" + author.id + "/posts/" + editedPost.id + "/", editedPost)
    .then((response) => {
      dispatch({ type: EDIT_POST_SUCCESS, payload: response.data });

      if (setter !== null) {
        setter(response.data);
      }



    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: EDIT_POST_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};


export const deletePost = (aPost) => (dispatch, getState) => {
  const state = getState();
  const author = state.auth.author;

  setAxiosAuthToken(getState().auth.token);
  dispatch({ type: DELETE_POST_SUBMITTED });

  axios
    .delete("/author/" + author.id + "/posts/" + aPost.id + "/")
    .then((response) => {
      dispatch({ type: DELETE_POST_SUCCESS, payload: aPost.id});
      dispatch(push("/stream"));
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: DELETE_POST_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const likePost = (post, chainFunction=null) => (dispatch, getState) => {
  // if chainFunction is given, chainFunction is called when .post success
  const likedPost = {};
  const state = getState();
  const author = state.auth.author;
  setAxiosAuthToken(state.auth.token);

  likedPost["type"] = "like";
  likedPost["author"] = 
  {...author,
    "type": "author",
    "id": author.id,
    "url": author.host + "api/author/" + author.id,
  };
  likedPost["object"] = post.author.host + "api/author/" + post.author.id + "/posts/" + post.id + "/";
  likedPost["host"] = post.author.host;

  dispatch({ type: LIKE_POST_SUBMITTED });
  axios
    .post("/author/" + post.author.id + "/inbox/", likedPost)
    .then((response) => {
      dispatch({ type: LIKE_POST_SUCCESS, payload: response.data });
      if (chainFunction !== null) {
        chainFunction();
      }
    })
    .catch((error) => {
      if (error.response) {

        // handles specific status code
        switch (error.response.status) {
          case 409:
            toast.error("You already liked this post");
            break;
          case 404:
            toast.error("Author have deleted this post");
            break;
          case 401:
            // too deep in the rabbit hole
            // like polling/like is handled by post.jsx
            // if 401 happends, then we just ignore it, this error will eventually cought by navigationbar
            // and redirect user to login.
            break;
          default:
            toast.error(JSON.stringify(error.response.data));
            break;
        }

        dispatch({
          type: LIKE_POST_ERROR,
          errorData: error.response.data,
        });

      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
  };

export const retrieveLoggedInAuthorPosts = () => (dispatch, getState) => {
  const state = getState();
  const author = state.auth.author;

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_POSTS_SUBMITTED });
  axios
    .get("/author/" + author.id + "/posts/")
    .then((response) => {
      dispatch({ type: RETRIEVE_POSTS_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: RETRIEVE_POSTS_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

