import {
  RETRIEVE_AUTHOR_ERROR,
  RETRIEVE_AUTHOR_SUBMITTED,
  RETRIEVE_AUTHOR_SUCCESS,
  RETRIEVE_AUTHOR_POSTS_ERROR,
  RETRIEVE_AUTHOR_POSTS_SUBMITTED,
  RETRIEVE_AUTHOR_POSTS_SUCCESS,
} from "./ProfileTypes";

const initialState = {
  error: "",
  retrievedAuthor: {},
  retrievedAuthorPosts: [],
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_AUTHOR_SUBMITTED:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case RETRIEVE_AUTHOR_ERROR:
      return {
        ...state,
        error: action.errorData,
        loading: false,
      };
    case RETRIEVE_AUTHOR_SUCCESS:
      return {
        ...state,
        error: "",
        retrievedAuthor: action.payload,
        loading: false,
      };
    case RETRIEVE_AUTHOR_POSTS_SUBMITTED:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case RETRIEVE_AUTHOR_POSTS_ERROR:
      return {
        ...state,
        error: action.errorData,
        loading: false,
      };
    case RETRIEVE_AUTHOR_POSTS_SUCCESS:
      return {
        ...state,
        error: "",
        retrievedAuthorPosts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
