import {
  NEW_POST_ERROR,
  NEW_POST_SUBMITTED,
  NEW_POST_SUCCESS,
  RETRIEVE_INBOX_ERROR,
  RETRIEVE_INBOX_SUBMITTED,
  RETRIEVE_INBOX_SUCCESS,
  RETRIEVE_POSTS_ERROR,
  RETRIEVE_POSTS_SUBMITTED,
  RETRIEVE_POSTS_SUCCESS,
  RETRIEVE_ALL_AUTHORS_ERROR,
  RETRIEVE_ALL_AUTHORS_SUCCESS,
  LIKE_POST_ERROR,
  LIKE_POST_SUBMITTED,
  LIKE_POST_SUCCESS,
  SHARE_POST_ERROR,
  SHARE_POST_SUBMITTED,
  SHARE_POST_SUCCESS,
} from "./StreamTypes";

const initialState = {
  error: "",
  currentAuthorPosts: [],
  allAuthors: [],
  currentAuthorInbox: {},
  currentAuthorPosts: [],
  currentInboxPosts: [],
  currentInboxLikes: [],
  currentInboxFollows: [],
  currentInboxComments: [],
  loading: false,
};

export const streamReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_POST_SUBMITTED:
    case RETRIEVE_POSTS_SUBMITTED:
    case RETRIEVE_INBOX_SUBMITTED:
    case SHARE_POST_SUBMITTED:
    case LIKE_POST_SUBMITTED:
    return {
      ...state,
      error: "",
      loading: true,
    };
    case NEW_POST_ERROR:
    case RETRIEVE_ALL_AUTHORS_ERROR:
    case RETRIEVE_POSTS_ERROR:
    case RETRIEVE_INBOX_ERROR:
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
    case RETRIEVE_INBOX_SUCCESS:
      const posts = action.payload["items"].filter((m) => m["type"] === "post");
      const follows = action.payload["items"].filter((m) => m["type"] === "follow");
      const likes = action.payload["items"].filter((m) => m["type"] === "like");
      const comments = action.payload["items"].filter((m) => m["type"] === "comments");
      return {
        ...state,
        retrieveInboxError: "",
        currentAuthorInbox: action.payload,
        currentInboxPosts: posts,
        currentInboxFollows: follows,
        currentInboxLikes: likes,
        currentInboxComments: comments,
        loading: false,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        error: "",
        currentAuthorPosts: action.payload,
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
    case SHARE_POST_SUCCESS:
      return {
        ...state,
        error: "",
        currentAuthorPosts: [...state.currentAuthorPosts, action.payload],
        loading: false,
      };
    default:
      return state;
  }
};
