import {
    RETRIEVE_INBOX_SUBMITTED,
    RETRIEVE_INBOX_ERROR,
    RETRIEVE_INBOX_SUCCESS,

    CLEAR_INBOX_SUBMITTED,
    CLEAR_INBOX_ERROR,
    CLEAR_INBOX_SUCCESS,

    RETRIEVE_ALL_AUTHORS_SUCCESS,
    RETRIEVE_ALL_AUTHORS_ERROR,
  } from "./NavigationTypes";

const initialState = {
    error: "",
    allAuthors: [],
    currentAuthorInbox: {},
    currentInboxPosts: [],
    currentInboxLikes: [],
    currentInboxFollows: [],
};


export const streamReducer = (state = initialState, action) => {
    switch (action.type) {

        // submitted
        case RETRIEVE_INBOX_SUBMITTED:
        case CLEAR_INBOX_SUBMITTED:
            return {
                ...state,
                error: "",
            };

        // error
        case RETRIEVE_ALL_AUTHORS_ERROR:
        case RETRIEVE_INBOX_ERROR:
        case CLEAR_INBOX_ERROR:
            return {
                ...state,
                error: action.errorData,
            };
    
        // success
        case RETRIEVE_INBOX_SUCCESS:
            const posts = action.payload["items"].filter((m) => m["type"] === "post");
            const follows = action.payload["items"].filter((m) => m["type"] === "follow");
            const likes = action.payload["items"].filter((m) => m["type"] === "like");
            return {
                ...state,
                currentAuthorInbox: action.payload,
                currentInboxPosts: posts,
                currentInboxFollows: follows,
                currentInboxLikes: likes,
            };
        case CLEAR_INBOX_SUCCESS:
            return {
                ...state,
                currentAuthorInbox: [],
                currentInboxPosts: [],
                currentInboxFollows: [],
                currentInboxLikes: [],
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