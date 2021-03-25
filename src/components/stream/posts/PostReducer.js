import {
    RETRIEVE_POST_ERROR,
    RETRIEVE_POST_SUBMITTED,
    RETRIEVE_POST_SUCCESS,
  } from "./PostTypes";
  
  const initialState = {
    error: "",
    retrievedPost: {},
    loading: false,
  };
  
  export const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case RETRIEVE_POST_SUBMITTED:
        return {
          ...state,
          error: "",
          loading: true,
        };
      case RETRIEVE_POST_ERROR:
        return {
          ...state,
          error: action.errorData,
          loading: false,
        };
      case RETRIEVE_POST_SUCCESS:
        return {
          ...state,
          error: "",
          retrievedPost: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  