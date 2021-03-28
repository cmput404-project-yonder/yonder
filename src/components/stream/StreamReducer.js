import {
  NEW_POST_ERROR,
  NEW_POST_SUBMITTED,
  NEW_POST_SUCCESS,
  RETRIEVE_INBOX_ERROR,
  RETRIEVE_INBOX_SUBMITTED,
  RETRIEVE_INBOX_SUCCESS,
} from "./StreamTypes";

const initialState = {
  newPostError: "",
  currentAuthorInbox: {},
  currentInboxPosts: [],
  currentInboxLikes: [],
  currentInboxFollows: [],
  currentInboxComments: [],
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
        loading: false,
      };
    case RETRIEVE_INBOX_SUBMITTED:
      return {
        ...state,
        retrieveInboxError: "",
        loading: true,
      };
    case RETRIEVE_INBOX_ERROR:
      return {
        ...state,
        retrieveInboxError: action.errorData,
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
    default:
      return state;
  }
};
