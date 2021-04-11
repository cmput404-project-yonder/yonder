import {
    RETRIEVE_POST_ERROR,
    RETRIEVE_POST_SUBMITTED,
    RETRIEVE_POST_SUCCESS,
    NEW_COMMENT_SUBMITTED,
    NEW_COMMENT_SUCCESS,
    NEW_COMMENT_ERROR,
    RETRIEVE_COMMENT_LIST_SUBMITTED,
    RETRIEVE_COMMENT_LIST_SUCCESS,
    RETRIEVE_COMMENT_LIST_ERROR,
  } from "./PostTypes";
  
  const initialState = {
    error: "",
    retrievedPost: {},
    comments: [],
    retrievedCommentList: [],
    retrievedAuthor: {},
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
        case NEW_COMMENT_SUBMITTED:
          return {
            ...state,
            error: "",
            loading: true,
          };
        case NEW_COMMENT_SUCCESS:
          return {
            ...state,
            error: action.errorData,
            loading: false,
          };
        case NEW_COMMENT_ERROR:
          return {
            ...state,
            error: "",
            comments: action.payload,
            loading: false,
          };
        case RETRIEVE_COMMENT_LIST_SUBMITTED:
          return {
            ...state,
            error: "",
            loading: true,
          };
        case RETRIEVE_COMMENT_LIST_ERROR:
          return {
            ...state,
            error: action.errorData,
            loading: false,
          };
        case RETRIEVE_COMMENT_LIST_SUCCESS:
          return {
            ...state,
            error: "",
            retrievedCommentList: action.payload,
            loading: false,
          };
      default:
        return state;
    }
  };
  