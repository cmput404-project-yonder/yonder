import axios from "axios";
import { toast } from "react-toastify";
import {
  RETRIEVE_AUTHOR_SUBMITTED,
  RETRIEVE_AUTHOR_SUCCESS,
  RETRIEVE_AUTHOR_ERROR,
  RETRIEVE_AUTHOR_POSTS_SUBMITTED,
  RETRIEVE_AUTHOR_POSTS_SUCCESS,
  RETRIEVE_AUTHOR_POSTS_ERROR,
} from "./ProfileTypes";
import { setAxiosAuthToken } from "../../utils/Utils";

export const retrieveAuthor = (authorId) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_AUTHOR_SUBMITTED });
  axios
    .get("/author/" + authorId)
    .then((response) => {
      dispatch({ type: RETRIEVE_AUTHOR_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: RETRIEVE_AUTHOR_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const retrieveAuthorPosts = (authorId) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_AUTHOR_POSTS_SUBMITTED });
  axios
    .get("/author/" + authorId + "/posts/")
    .then((response) => {
      dispatch({ type: RETRIEVE_AUTHOR_POSTS_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: RETRIEVE_AUTHOR_POSTS_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};
