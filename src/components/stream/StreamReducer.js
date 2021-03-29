import {
  NEW_POST_ERROR,
  NEW_POST_SUBMITTED,
  NEW_POST_SUCCESS,
  RETRIEVE_POSTS_ERROR,
  RETRIEVE_POSTS_SUBMITTED,
  RETRIEVE_POSTS_SUCCESS,
  LIKE_POST_ERROR,
  LIKE_POST_SUBMITTED,
  LIKE_POST_SUCCESS,
} from "./StreamTypes";

const initialState = {
  newPostError: "",
  currentAuthorPosts: [],
  loading: false,
};

export const streamReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_POST_SUBMITTED:
      return {
        ...state,
        newPostError: "",
        loading: true,
      };
    case NEW_POST_ERROR:
      return {
        ...state,
        newPostError: action.errorData,
        loading: false,
      };
    case NEW_POST_SUCCESS:
      return {
        ...state,
        newPostError: "",
        currentAuthorPosts: [...state.currentAuthorPosts, action.payload],
        loading: false,
      };
    case RETRIEVE_POSTS_SUBMITTED:
      return {
        ...state,
        retrievePostsError: "",
        loading: true,
      };
    case RETRIEVE_POSTS_ERROR:
      return {
        ...state,
        retrievePostsError: action.errorData,
        loading: false,
      };
    case RETRIEVE_POSTS_SUCCESS:
      return {
        ...state,
        retrievePostsError: "",
        currentAuthorPosts: action.payload,
        loading: false,
      };
    case LIKE_POST_SUBMITTED:
      return {
        ...state,
        likePostError: "",
        loading: true,
      };
    case LIKE_POST_ERROR:
      return {
        ...state,
        likePostError: action.errorData,
        loading: false,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        likePostError: "",
        currentAuthorPosts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
