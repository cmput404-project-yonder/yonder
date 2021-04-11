import {
  NEW_POST_ERROR,
  NEW_POST_SUBMITTED,
  NEW_POST_SUCCESS,

  RETRIEVE_POSTS_ERROR,
  RETRIEVE_POSTS_SUBMITTED,
  RETRIEVE_POSTS_SUCCESS,

  LIKE_POST_ERROR,
  LIKE_POST_SUCCESS,
  SHARE_POST_ERROR,
  SHARE_POST_SUBMITTED,
  SHARE_POST_SUCCESS,
  EDIT_POST_SUBMITTED,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUBMITTED,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,

} from "./StreamTypes";

const initialState = {
  error: "",
  currentAuthorPosts: [],
  loading: false,
};

export const streamReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_POST_SUBMITTED:
    case DELETE_POST_SUBMITTED:
    case NEW_POST_SUBMITTED:
    case RETRIEVE_POSTS_SUBMITTED:
    case SHARE_POST_SUBMITTED:
    return {
      ...state,
      error: "",
      loading: true,
    };
    case EDIT_POST_ERROR:
    case DELETE_POST_ERROR:
    case NEW_POST_ERROR:
    case RETRIEVE_POSTS_ERROR:
    case LIKE_POST_ERROR:
    case SHARE_POST_ERROR:
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
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      };
    case RETRIEVE_POSTS_SUCCESS:
      return {
        ...state,
        error: "",
        currentAuthorPosts: action.payload,
        loading: false,
      };
    case SHARE_POST_SUCCESS:
      return {
        ...state,
        error: "",
        currentAuthorPosts: [...state.currentAuthorPosts, action.payload],
        loading: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        currentAuthorPosts: state.currentAuthorPosts.filter((post)=>post.id!=action.payload),
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        currentAuthorPosts: state.currentAuthorPosts.map((post)=> post.id==action.payload.id?{...post,...action.payload}:post),
        loading: false,
        error: "",
      }
  
    default:
      return state;
  }
};
