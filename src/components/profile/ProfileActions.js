import axios from "axios";
import { toast } from "react-toastify";
import {
  RETRIEVE_AUTHOR_SUBMITTED,
  RETRIEVE_AUTHOR_SUCCESS,
  RETRIEVE_AUTHOR_ERROR,
  RETRIEVE_AUTHOR_POSTS_SUBMITTED,
  RETRIEVE_AUTHOR_POSTS_SUCCESS,
  RETRIEVE_AUTHOR_POSTS_ERROR,
  SEND_FOLLOW_SUBMITTED,
  SEND_FOLLOW_ERROR,
  SEND_FOLLOW_SUCCESS,
  CHECK_FOLLOW_SUBMITTED,
  CHECK_FOLLOW_ERROR,
  CHECK_FOLLOW_SUCCESS,
  CHANGE_PROFILE_SUBMITTED,
  CHANGE_PROFILE_ERROR,
  CHANGE_PROFILE_SUCCESS
} from "./ProfileTypes";
import { setAxiosAuthToken } from "../../utils/Utils";

export const retrieveAuthor = (authorId) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_AUTHOR_SUBMITTED });
  axios
    .get("/author/" + authorId + "/")
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

export const sendFollow = (otherAuthor) => (dispatch, getState) => {
  const state = getState();
  const author = state.auth.author;

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: SEND_FOLLOW_SUBMITTED });
  axios
    .put("/author/" + otherAuthor.id + "/followers/" + author.id + "/", author)
    .then((response) => {
      dispatch({ type: SEND_FOLLOW_SUCCESS });
      toast.success("You are now following " + otherAuthor.displayName);

      return response.status;
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: SEND_FOLLOW_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }

      return error.status;
    });
};

export const checkFollowing = (otherAuthorId) => (dispatch, getState) => {
  const state = getState();
  const author = state.auth.author;

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: CHECK_FOLLOW_SUBMITTED });
  axios
    .get("/author/" + otherAuthorId + "/followers/" + author.id + "/")
    .then((response) => {
      if (response.status == 200) {
        dispatch({ type: CHECK_FOLLOW_SUCCESS, payload: true });
      }
      else if (response.status == 204) {
        dispatch({ type: CHECK_FOLLOW_SUCCESS, payload: true });
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: CHECK_FOLLOW_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const editProfile = (newProfile) => (dispatch, getState) => {
  const state = getState();
  const author = state.auth.author;

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: CHANGE_PROFILE_SUBMITTED });
  axios
    .put("/author/" + author.id + "/", newProfile)
    .then((response) => {
      dispatch({ type: CHANGE_PROFILE_SUCCESS , payload: response.data});
      toast.success("You profile is changed");
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: CHANGE_PROFILE_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};