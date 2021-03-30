import {
  NEW_POST_ERROR,
  NEW_POST_SUBMITTED,
  NEW_POST_SUCCESS,
  RETRIEVE_POSTS_ERROR,
  RETRIEVE_POSTS_SUBMITTED,
  RETRIEVE_POSTS_SUCCESS,
  RETRIEVE_ALL_AUTHORS_ERROR,
  RETRIEVE_ALL_AUTHORS_SUCCESS
} from "./StreamTypes";

const initialState = {
  error: "",
  currentAuthorPosts: [],
  allAuthors: [],
  loading: false,
};

export const streamReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_POST_SUBMITTED:
    case RETRIEVE_POSTS_SUBMITTED:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case NEW_POST_ERROR:
    case RETRIEVE_ALL_AUTHORS_ERROR:
    case RETRIEVE_POSTS_ERROR:
      return {
        ...state,
        error: action.errorData,
        loading: false,
      };
    case NEW_POST_SUCCESS:
      return {
        ...state,
        error: "",
        currentAuthorPosts: [...state.currentAuthorPosts, action.payload],
        loading: false,
      };
    case RETRIEVE_POSTS_SUCCESS:
      return {
        ...state,
        error: "",
        currentAuthorPosts: action.payload,
        loading: false,
      };
    case RETRIEVE_ALL_AUTHORS_SUCCESS:
      return {
        ...state,
        error: "",
        allAuthors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
