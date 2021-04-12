import axios from "axios";
import { toast } from "react-toastify";
import {
    RETRIEVE_INBOX_SUBMITTED,
    RETRIEVE_INBOX_ERROR,
    RETRIEVE_INBOX_SUCCESS,

    CLEAR_INBOX_SUBMITTED,
    CLEAR_INBOX_ERROR,
    CLEAR_INBOX_SUCCESS,

    RETRIEVE_ALL_AUTHORS_SUCCESS,
    RETRIEVE_ALL_AUTHORS_ERROR,
  } from "./NavigationTypes";
import { setAxiosAuthToken } from "../utils/Utils";

export const retrieveInbox = () => (dispatch, getState) => {
const state = getState();
const authorId = state.auth.author.id;

setAxiosAuthToken(state.auth.token);
dispatch({ type: RETRIEVE_INBOX_SUBMITTED });
axios
    .get("/author/" + authorId + "/inbox/")
    .then((response) => {
    dispatch({ type: RETRIEVE_INBOX_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        dispatch({
          type: RETRIEVE_INBOX_ERROR,
          errorData: error.response,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const clearInbox = () => (dispatch, getState) => {
const state = getState();
const authorId = state.auth.author.id;

setAxiosAuthToken(state.auth.token);
dispatch({ type: CLEAR_INBOX_SUBMITTED });
axios
    .delete("/author/" + authorId + "/inbox/")
    .then((response) => {
    dispatch({ type: CLEAR_INBOX_SUCCESS });
    })
    .catch((error) => {
    if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
        type: CLEAR_INBOX_ERROR,
        errorData: error.response,
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

    setAxiosAuthToken(state.auth.token);
    axios
    .get("/authors/" + "all/")
    .then((response) => {
        dispatch({ type: RETRIEVE_ALL_AUTHORS_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: RETRIEVE_ALL_AUTHORS_ERROR,
          errorData: error.response,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};
