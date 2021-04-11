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

export const retrievePost = (authorId, postId) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_POST_SUBMITTED });
  axios
    .get("/author/" + authorId + "/posts/" + postId + "/")
    .then((response) => {
      dispatch({ type: RETRIEVE_POST_SUCCESS, payload: response.data });
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

export const createComment = (comment) => (dispatch, getState) => {
  const commentObj = {};
  const state = getState();
  const author = state.auth.author;

  setAxiosAuthToken(state.auth.token);
  commentObj["author"] = author;
  commentObj["comment"] = comment;
  commentObj["contentType"] = "text/markdown";
  
  dispatch({ type: NEW_COMMENT_SUBMITTED });
  axios
    .post("/author/" + state.auth.author.id + "/posts/" + state.post.retrievedPost.id + "/comments/", commentObj)
    .then((response) => {
      dispatch({ type: NEW_COMMENT_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: NEW_COMMENT_ERROR,
          errorData: error.response.data,
        });
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

export const updateRetrivedPost = (newPost) => (dispatch) => {
  dispatch({type: UPDATE_RETRIEVED_POST, payload: newPost});
}

export const retrievePostLikes = (post, setterFunction) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  dispatch({ type:  RETRIEVE_POSTLIKE_SUBMITTED});
  axios
    .get("/author/" + post.author.id + "/posts/" + post.id + "/likes/")
    .then((response) => {
      dispatch({ type: RETRIEVE_POST_SUCCESS, payload: response.data});
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
