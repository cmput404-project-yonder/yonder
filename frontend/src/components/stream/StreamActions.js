import axios from "axios";
import { toast } from "react-toastify";
import { NEW_POST_ERROR, NEW_POST_SUBMITTED, NEW_POST_SUCCESS, RETREIVE_POSTS } from "./StreamTypes";
import { setAxiosAuthToken } from "../../utils/Utils";

export const createPost = (newPost) => (dispatch) => {
  setAxiosAuthToken(localStorage.getItem("token"));
  dispatch({ type: NEW_POST_SUBMITTED });
  axios
    .post("/author/" + newPost.author + "/posts/", newPost)
    .then((response) => {
      dispatch({ type: NEW_POST_SUCCESS });
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
