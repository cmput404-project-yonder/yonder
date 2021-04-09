import axios from "axios";
import { toast } from "react-toastify";
import {
  RETRIEVE_POST_SUBMITTED,
  RETRIEVE_POST_SUCCESS,
  RETRIEVE_POST_ERROR,
  NEW_COMMENT_SUBMITTED,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_ERROR,
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
      console.log(commentObj);
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