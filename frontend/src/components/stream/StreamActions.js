import axios from "axios";
import { toast } from "react-toastify";
import {
  NEW_POST_ERROR,
  NEW_POST_SUBMITTED,
  NEW_POST_SUCCESS,
  RETREIVE_POSTS_SUBMITTED,
  RETREIVE_POSTS_SUCCESS,
  RETREIVE_POSTS_ERROR,
  EDIT_POST_SUBMITTED,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
} from "./StreamTypes";
import { setAxiosAuthToken } from "../../utils/Utils";

export const createPost = (newPost) => (dispatch, getState) => {
  setAxiosAuthToken(getState().auth.token);
  dispatch({ type: NEW_POST_SUBMITTED });
  axios
    .post("/author/" + newPost.author + "/posts/", newPost)
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
  setAxiosAuthToken(getState().auth.token);
  dispatch({ type: EDIT_POST_SUBMITTED });
  console.log(editedPost);
  axios
    .put("/author/" + editedPost.author + "/posts/" + editedPost.id, editedPost)
    .then((response) => {
      dispatch({ type: EDIT_POST_SUCCESS, payload: response.data });
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

export const retreivePosts = () => (dispatch, getState) => {
  const state = getState();
  const author = state.auth.author;

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETREIVE_POSTS_SUBMITTED });
  axios
    .get("/author/" + author.id + "/posts/")
    .then((response) => {
      dispatch({ type: RETREIVE_POSTS_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: RETREIVE_POSTS_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};
