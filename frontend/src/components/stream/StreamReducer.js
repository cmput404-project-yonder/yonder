import {
  NEW_POST_ERROR,
  NEW_POST_SUBMITTED,
  NEW_POST_SUCCESS,
  RETREIVE_POSTS_ERROR,
  RETREIVE_POSTS_SUBMITTED,
  RETREIVE_POSTS_SUCCESS,
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
    case RETREIVE_POSTS_SUBMITTED:
      return {
        ...state,
        retreivePostsError: "",
        loading: true,
      };
    case RETREIVE_POSTS_ERROR:
      return {
        ...state,
        retreivePostsError: action.errorData,
        loading: false,
      };
    case RETREIVE_POSTS_SUCCESS:
      return {
        ...state,
        retreivePostsError: "",
        currentAuthorPosts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
