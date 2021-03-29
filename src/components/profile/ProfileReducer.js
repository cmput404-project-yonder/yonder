import { retrieveAuthor } from "./ProfileActions";
import {
  RETRIEVE_AUTHOR_ERROR,
  RETRIEVE_AUTHOR_SUBMITTED,
  RETRIEVE_AUTHOR_SUCCESS,
  RETRIEVE_AUTHOR_POSTS_ERROR,
  RETRIEVE_AUTHOR_POSTS_SUBMITTED,
  RETRIEVE_AUTHOR_POSTS_SUCCESS,
  SEND_FOLLOW_SUBMITTED,
  SEND_FOLLOW_ERROR,
  SEND_FOLLOW_SUCCESS,
  CHECK_FOLLOW_SUBMITTED,
  CHECK_FOLLOW_ERROR,
  CHECK_FOLLOW_SUCCESS,
  CHANGE_PROFILE_SUBMITTED,
  CHANGE_PROFILE_ERROR,
  CHANGE_PROFILE_SUCCESS,
} from "./ProfileTypes";

const initialState = {
  error: "",
  retrievedAuthor: {},
  retrievedAuthorPosts: [],
  isFollowing: false,
  loading: false,
};


export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PROFILE_SUBMITTED:
    case RETRIEVE_AUTHOR_POSTS_SUBMITTED:
    case SEND_FOLLOW_SUBMITTED:
    case CHECK_FOLLOW_SUBMITTED:
    case RETRIEVE_AUTHOR_SUBMITTED:
      return {
        ...state,
        error: "",
        loading: true,
      };

    case CHANGE_PROFILE_ERROR:
    case RETRIEVE_AUTHOR_POSTS_ERROR:
    case RETRIEVE_AUTHOR_ERROR:
    case SEND_FOLLOW_ERROR:
    case CHECK_FOLLOW_ERROR:
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
    case RETRIEVE_AUTHOR_POSTS_SUCCESS:
      return {
        ...state,
        error: "",
        retrievedAuthorPosts: action.payload,
        loading: false,
      };
    case SEND_FOLLOW_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      };
    case CHECK_FOLLOW_SUCCESS:
      return {
        ...state,
        error: "",
        isFollowing: action.payload,
        loading: false,
      };

    case CHANGE_PROFILE_SUCCESS:
      return {
        ...state,
        error: "",
        retrievedAuthor: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
