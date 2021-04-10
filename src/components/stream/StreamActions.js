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
  RETRIEVE_INBOX_SUBMITTED,
  RETRIEVE_INBOX_ERROR,
  RETRIEVE_INBOX_SUCCESS,
  RETRIEVE_POSTS_SUBMITTED,
  RETRIEVE_POSTS_SUCCESS,
  RETRIEVE_POSTS_ERROR,
  RETRIEVE_ALL_AUTHORS_SUCCESS,
  RETRIEVE_ALL_AUTHORS_ERROR,
  LIKE_POST_SUBMITTED,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  SHARE_POST_ERROR,
  SHARE_POST_SUBMITTED,
  SHARE_POST_SUCCESS,
} from "./StreamTypes";
import { setAxiosAuthToken, isEmpty } from "../../utils/Utils";


export const sharePost = (newPost) => (dispatch, getState) => {
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

export const updatePost = (editedPost) => (dispatch, getState) => {
  const state = getState();
  const author = state.auth;

  setAxiosAuthToken(getState().auth.token);
  dispatch({ type: EDIT_POST_SUBMITTED });
  console.log(editedPost);
  axios
    .put("/author/" + author.id + "/posts/" + editedPost.id + "/", editedPost)
    .then((response) => {
      dispatch({ type: EDIT_POST_SUCCESS, payload: editedPost });
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

export const retrieveInbox = () => (dispatch, getState) => {
  const state = getState();
  const authorId = state.auth.author.id;

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_INBOX_SUBMITTED });
  axios
    .get("/author/" + authorId + "/inbox/")
    .then((response) => {
      dispatch({ type: RETRIEVE_INBOX_SUCCESS, payload: response.data });
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: RETRIEVE_INBOX_ERROR,
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

export const retrieveAllAuthors = () => (dispatch, getState) => {
  const state = getState();
  const cachedAuthors = JSON.parse(sessionStorage.getItem("allAuthors")); 

  if (isEmpty(cachedAuthors)) {
    setAxiosAuthToken(state.auth.token);
    // No SUMBITTED dispatch, cause retrieving from other servers can take a while;
    axios
      .get("/authors/" + "all/")
      .then((response) => {
        dispatch({ type: RETRIEVE_ALL_AUTHORS_SUCCESS, payload: response.data });
        sessionStorage.setItem("allAuthors", JSON.stringify(response.data));
      })
      .catch((error) => {
        if (error.response) {
          toast.error(JSON.stringify(error.response.data));
          dispatch({
            type: RETRIEVE_ALL_AUTHORS_ERROR,
            errorData: error.response.data,
          });
        } else if (error.message) {
          toast.error(JSON.stringify(error.message));
        } else {
          toast.error(JSON.stringify(error));
        }
      });
    } else {
      dispatch({ type: RETRIEVE_ALL_AUTHORS_SUCCESS, payload: cachedAuthors });
    }
};


export const likePost = (post) => (dispatch, getState) => {
  const likedPost = {};
  const state = getState();
  const author = state.auth.author;
  setAxiosAuthToken(state.auth.token);

  likedPost["type"] = "like";
  likedPost["author"] = 
  {...author,
    "type": "author",
    "id": author.id,
    "url": author.host + "author/" + author.id + "/",
  };
  likedPost["object"] = likedPost["author"]["url"] + "/posts/" + post.id + "/";
  likedPost["host"] = post.author.host;

  dispatch({ type: LIKE_POST_SUBMITTED });
  axios
    .post("/author/" + post.author.id + "/inbox/", likedPost)
    .then((response) => {
      dispatch({ type: LIKE_POST_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {

        // handles specific status code
        switch (error.response.status) {
          case 409:
            toast.error("You already liked this post");
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

