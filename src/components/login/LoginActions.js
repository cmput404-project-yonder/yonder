import axios from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { SET_TOKEN, SET_CURRENT_USER, SET_CURRENT_AUTHOR, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";

export const login = (userData, redirectTo) => (dispatch) => {
  axios
    .post("/login/", userData)
    .then((response) => {
      const auth_token = response.data.token;
      const author = response.data.author;
      const user = response.data.user;

      setAxiosAuthToken(auth_token);
      dispatch(setToken(auth_token));
      dispatch(setCurrentUser(user));
      dispatch(setCurrentAuthor(author, redirectTo));
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};

export const setCurrentUser = (user) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

export const setCurrentAuthor = (author, redirectTo) => (dispatch) => {
  localStorage.setItem("author", JSON.stringify(author));
  dispatch({
    type: SET_CURRENT_AUTHOR,
    payload: author,
  });

  if (redirectTo !== "") {
    dispatch(push(redirectTo));
  }
};

export const setToken = (token) => (dispatch) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const unsetCurrentUser = () => (dispatch) => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("author");
  localStorage.removeItem("user");
  dispatch({
    type: UNSET_CURRENT_USER,
  });
};

export const logout = () => (dispatch) => {
  axios
    .post("api/logout/")
    .then((response) => {
      dispatch(unsetCurrentUser());
      dispatch(push("/login"));
      toast.success("Logout successful.");
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};
