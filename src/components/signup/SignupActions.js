import axios from "axios";
import { toast } from "react-toastify";
import { push } from "connected-react-router";
import { CREATE_USER_ERROR, CREATE_USER_SUBMITTED, CREATE_USER_SUCCESS } from "./SignupTypes";
import { setAxiosAuthToken } from "../../utils/Utils";

export const signup = (userData) => (dispatch) => {
  dispatch({ type: CREATE_USER_SUBMITTED }); // set submitted state
  axios
    .post("/signup/", userData)
    .then((response) => {
      dispatch({ type: CREATE_USER_SUCCESS });
      toast.success("Account created successfully. Request access from an admin.");

      dispatch(push("/login"));
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
