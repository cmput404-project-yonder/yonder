import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_USER_ERROR, CREATE_USER_SUBMITTED, CREATE_USER_SUCCESS } from "./SignupTypes";
import { setToken, setCurrentUser, setCurrentAuthor } from "../login/LoginActions";
import { setAxiosAuthToken } from "../../utils/Utils";

export const signup = (userData) => (dispatch) => {
  dispatch({ type: CREATE_USER_SUBMITTED }); // set submitted state
  axios
    .post("/signup", userData)
    .then((response) => {
      dispatch({ type: CREATE_USER_SUCCESS });
      toast.success("Account created successfully.");

      // Handle loging & redirect user
      const auth_token = response.data.token;
      const author = response.data.author;
      const user = response.data.user;

      setAxiosAuthToken(auth_token);
      dispatch(setToken(auth_token));
      dispatch(setCurrentUser(user));
      dispatch(setCurrentAuthor(author, "/stream"));
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: CREATE_USER_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        // the error message is available,
        // let's display it on error toast
        toast.error(JSON.stringify(error.message));
      } else {
        // strange error, just show it
        toast.error(JSON.stringify(error));
      }
    });
};
