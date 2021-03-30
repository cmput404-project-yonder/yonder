import axios from "axios";
import { toast } from "react-toastify";
import {
  RETRIEVE_POST_SUBMITTED,
  RETRIEVE_POST_SUCCESS,
  RETRIEVE_POST_ERROR,
} from "./PostTypes";
import { setAxiosAuthToken } from "../../../utils/Utils";

export const retrievePost = (postId) => (dispatch, getState) => {
  const state = getState();

  setAxiosAuthToken(state.auth.token);
  dispatch({ type: RETRIEVE_POST_SUBMITTED });
  axios
    .get("/author/" + state.auth.author.id + "/posts/" + postId + "/")
    .then((response) => {
      dispatch({ type: RETRIEVE_POST_SUCCESS, payload: response.data });
      // console.log("1");
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: RETRIEVE_POST_ERROR,
          errorData: error.response.data,
        });
        // console.log("2");
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
        // console.log("3");
      } else {
        toast.error(JSON.stringify(error));
        // console.log("4");
      }
    });
};
